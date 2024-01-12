import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Image,
  Modal,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import React from "react";
import { DocumentImage } from "src/assets/images";
import DOCUMENT_API from "src/services/api/students/DocumentAPI";
import { toast } from "react-toastify";
import PreviewDocument from "./Modal/PreviewDocument";
import { useRef } from "react";

const DocumentItem = ({
  documentItem,
  refreshAfterDelete,
  onRefreshAfterAccept,
  isLead,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, mutate } = useMutation(DOCUMENT_API.DELETE_FILE, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Xóa tài liệu thành công",
      });
      toast.success("Xóa tài liệu thành công");
      refreshAfterDelete(documentItem.id);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Xóa tài liệu thất bại",
      });
    },
  });
  const { mutate: mutateAcceptFile } = useMutation(DOCUMENT_API.ACCEPT_FILE, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Chấp nhận tài liệu thành công",
      });

      onRefreshAfterAccept();

      toast.success("Chấp nhận tài liệu thành công");
    },

    onError: () => {
      messageApi.open({
        type: "error",
        content: "Chấp nhận tài liệu thất bại",
      });

      toast.error("Chấp nhận tài liệu thất bại");
    },
  });
  const previewDocumentRef = useRef();

  const deleteDocument = () => {
    mutate(documentItem.id);
  };

  const confirmDeleteDocument = () => {
    Modal.confirm({
      title: "Xác nhận xóa tài liệu",
      okText: "Xóa tài liệu",
      cancelText: "Đóng cửa sổ",
      onOk: () => deleteDocument(),
    });
  };

  const onAcceptDocument = () => {
    mutateAcceptFile({ id: documentItem.id, approved: true });
  };

  const onPreviewDocument = () => {
    previewDocumentRef.current.openModal();
  };

  return (
    <Col>
      <PreviewDocument ref={previewDocumentRef} documentItem={documentItem} />
      <Card>
        <Space size="small" direction="vertical">
          <Typography.Title level={5}>{documentItem.name}</Typography.Title>
          <Space size="small">
            <Tooltip title="Xem chi tiết tài liệu">
              <Image
                width={80}
                fallback={DocumentImage}
                preview={false}
                onClick={onPreviewDocument}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>

            {contextHolder}
            <Space direction="vertical" size="middle">
              <Button
                onClick={onAcceptDocument}
                style={{ width: "100%" }}
                disabled={documentItem.approved || isLead === false}
              >
                Chấp thuận tài liệu
              </Button>
              <Button
                type="primary"
                onClick={confirmDeleteDocument}
                style={{ width: "100%" }}
                loading={isLoading}
                disabled={isLead === false}
              >
                Xóa tài liệu
              </Button>
            </Space>
          </Space>
        </Space>
      </Card>
    </Col>
  );
};

export default DocumentItem;
