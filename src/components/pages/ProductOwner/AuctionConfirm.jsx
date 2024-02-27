import React, { useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import TableAution from "src/views/Aution/TableAution";
import { useNavigate } from "react-router-dom";
function AutionComfirm() {
  const [data2, setData2] = useState([
    { id: 5, name: "Aution Confirm 5", status: "not active" },
    { id: 6, name: "Aution Confirm 6", status: "not active" },
    // Thêm dữ liệu mẫu khác tại đây
  ]);

  const navigate = useNavigate();
  const handleUpdateUser = (aution) => {
    // Chuyển hướng đến trang UpdateUser và truyền dữ liệu userEditData
    navigate(`/aution-detail/${aution.id}`);
    console.log("Update user at id:", aution.id);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Aution</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Hiện thị các đấu giá có trong hệ thống
            </p>
            <TableAution data={data2} onUpdate={handleUpdateUser} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default AutionComfirm;
