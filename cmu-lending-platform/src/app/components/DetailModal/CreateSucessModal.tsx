import React, { useEffect, useState } from 'react';
import { Button, Result, Modal, Spin } from 'antd';

type SuccessResultModalProps = {
    visible: boolean;
    onClose: () => void;
    setCreatesuccess: Function;
};

const CreateSucessModal = ({ visible, onClose, setCreatesuccess }: SuccessResultModalProps) => {
    const [loading, setLoading] = useState(true);
    const contractaddress = '0x2e44fde7919fd000000000000000000000000000';
    const [confirmVisible, setConfirmVisible] = useState(true);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (confirmed) {
            const timer = setTimeout(() => {
                setLoading(false);
                setCreatesuccess(true);
            }, 2000); // 2秒后停止加载

            return () => clearTimeout(timer);
        }
    }, [confirmed]);

    const handleConfirm = () => {
        setConfirmVisible(false);
        setConfirmed(true);
    };

    return (
        <Modal
            visible={visible}
            footer={null}
            onCancel={onClose}
            centered
            title="Request Status"
        >
            {confirmVisible ? (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <p style={{ fontSize: '20px', marginBottom: '20px' }}>Are you sure you want to confirm the request?</p>
                    <Button type="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button onClick={onClose} style={{ marginLeft: 20 }}>
                        Cancel
                    </Button>
                </div>

            ) : loading ? (
                <div style={{ textAlign: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Result
                    status="success"
                    title="Successful"
                    subTitle={` Contract created, address: ${contractaddress}, Configuration may takes a few minutes.`}
                    extra={[
                        <Button key="close" onClick={onClose}>
                            Close
                        </Button>,
                    ]}
                />
            )}
        </Modal>
    );
};

export default CreateSucessModal;