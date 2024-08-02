import React from 'react';
import { Button, Result, Modal } from 'antd';


type SuccessResultModalProps = {
    visible: boolean;
    onClose: () => void;
    contractaddress: string;
};

const CreateSucessModal = ({ visible, onClose, contractaddress }: SuccessResultModalProps) => (
    <Modal
        visible={visible}
        footer={null}
        onCancel={onClose}
        centered
    >
        <Result
            status="success"
            title="Successfully Contract created!"
            subTitle={`address: ${contractaddress}, Configuration may takes a few minutes.`}
            extra={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
        />
    </Modal>

);

export default CreateSucessModal;