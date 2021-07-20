import React, { useContext, useMemo, useState } from 'react';
import { Form, Select, Modal, Spin, Avatar } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.currentMembers).then(newOptions => {
        setOptions(newOptions);
        setFetching(false);
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchOptions]);  

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={ fetching ? <Spin size="small" /> : null }
      {...props}
    >
      {
        options.map(opt => (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar size="small" src={opt.photoURL}>{ opt.photoURL ?? opt.label?.charAt(0)?.toUpperCase() }</Avatar>
            {`${opt.label}`}
          </Select.Option>
        ))
      }
    </Select>
  );
}

const fetchUserList = async (search, currentMembers) => {
  return db
  .collection('users')
  .where('keyworks', 'array-contains', search)
  .orderBy('displayName')
  .limit(20)
  .get()
  .then(snapshot => {
    return snapshot.docs.map(doc => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    })).filter(opt => !currentMembers.includes(opt.value))
  });
}

export default function InviteMemberModal() {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
  const [value, setValue] = useState([]);

  const [form] = Form.useForm();

  const handleOK = () => {
    const roomRef = db.collection('rooms').doc(selectedRoomId);
    roomRef.update({
      members: [
        ...selectedRoom.members, 
        ...value.map(val => val.value)
      ]
    });

    setIsInviteMemberVisible(false);
    form.resetFields();
  }

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
    form.resetFields();
  }

  return (
    <div>
      <Modal
        title="Invite more member"
        visible={isInviteMemberVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Name members"
            value={value}
            placeholder="Enter name member"
            fetchOptions={fetchUserList}
            onChange={newValue => setValue(newValue)}
            currentMembers={selectedRoom?.members}
            style={{ width: '100%' }}
          />
        </Form>
      </Modal>
    </div>
  )
}