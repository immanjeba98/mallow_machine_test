import { Input, Button, Col, Row, Form, Avatar } from "antd";
import React, { memo, useEffect, useState } from "react";
import TableUi from "../UI/Table/TableUi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonAction from "../../redux/action/common";
import ModalPopup from "../UI/Modal/Modal";

const { Search } = Input;
interface Values {
    title?: string;
    description?: string;
    modifier?: string;
}
const MainPage = ({ GetTableData, userData, createUser, deletUser, isUserLoader }: any) => {
    const [filteredData, setFilteredData] = useState<any[]>([]); // Initialize with an empty array
    console.log(isUserLoader);

    // Fetch table data on component mount
    useEffect(() => {
        GetTableData();
    }, [GetTableData]);

    // Update filteredData whenever userData changes
    useEffect(() => {
        if (userData?.data) {
            setFilteredData(userData.data); // Update filteredData with the latest userData
        }
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const filtered = userData?.data.filter(
            (user: any) =>
                user.name?.toLowerCase().includes(value) ||
                user.email?.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    const handleSearch = (value: string) => {
        const lowerValue = value.toLowerCase();
        const filtered = userData?.data.filter(
            (user: any) =>
                user.name?.toLowerCase().includes(lowerValue) ||
                user.email?.toLowerCase().includes(lowerValue)
        );
        setFilteredData(filtered);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const showModal = () => {
        setIsModalOpen(true);
        setEditingRecord(null);
    };

    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState<Values>();

    const onCreate = async (values: Values) => {
        console.log("Received values of form: ", values);
        const response = await createUser(values);

        console.log("API Response: ", response);

        setFormValues(values);
        setFilteredData((prevData) => [...prevData, response]);
        setIsModalOpen(false);
    };
    const onUpdate = async (values: any) => {
        console.log("Received values of form: ", values);
        const body = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            avatar: values.avatar,
            id: editingRecord.id
        }
        const response = await createUser(body);
        console.log("API Response: ", response);
        setFormValues(values);
        setFilteredData((prevData) => prevData.map((item) => item.id === response.id ? response : item));
        setIsModalOpen(false);
    }
    const onEdit = (record: any) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    };
    const onDelete = async (record: any) => {
        try {
            // Call the delete function and wait for the response
            const res = await deletUser({ id: record.id });

            console.log("Deleted record ID:", res?.id);

            // Update the filtered data by removing the deleted record
            setFilteredData((prevData) => prevData.filter((item) => item.id !== res?.id));
        } catch (error) {
            console.error("Error while deleting the record:", error);
        }
    };
    return (
        <Row
            justify="center"
            align="top"
            style={{ height: "100vh", backgroundColor: "#f0f2f5", marginBottom: 10 }}
        >
            <Col md={24} xl={22}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
                            <Col>
                                <h1>User Data</h1>
                            </Col>
                            <Col>
                                <Row gutter={16} align="middle">
                                    <Col>
                                        <Search
                                            placeholder="Search users"
                                            onChange={handleInputChange}
                                            onSearch={handleSearch}
                                            style={{ width: 200 }}
                                        />
                                    </Col>
                                    <Col>
                                        <Button type="primary" onClick={() => showModal()}>
                                            Create
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <ModalPopup isModalOpen={isModalOpen} form={form} setIsModalOpen={setIsModalOpen} onCreate={onCreate} editingRecord={editingRecord} onUpdate={onUpdate} />
                {/* Pass filteredData to TableUi */}
                <TableUi filteredData={filteredData} onEdit={onEdit} onDelete={onDelete} loading={isUserLoader} />
                {/* {filteredData.length > 0 ? (
                ) : (
                    <p style={{ textAlign: "center", marginTop: 20 }}>No data available</p>
                )} */}
            </Col>
        </Row>
    );
};

const mapStatesToProps = ({
    common: { loginData = [], isLoginLoader = false, userData = {}, isUserLoader = false },
}: any) => {
    return { loginData, isLoginLoader, userData, isUserLoader };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            ...commonAction,
        },
        dispatch
    );
};

export default memo(connect(mapStatesToProps, mapDispatchToProps)(MainPage));