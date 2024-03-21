import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <Container fluid className="bg-dark text-white p-4 pt-5 pb-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <h5>Về chúng tôi</h5>
          <p>
            Auction là hệ thống ứng dụng đấu giá trực tuyến cung cấp dịch vụ đấu giá trực tuyến cho người dùng khắp cả nước sử dụng mọi lúc mọi nơi.
          </p>
        </Col>
        <Col md={6} lg={2}>
          <h5>Thông Tin</h5>
          <ul className="list-unstyled">
            <li>
              <a href="https://docs.google.com/document/d/1wHiHLmHivLH5tboGqxfcfztanMaKYAEFcwhX5U0CNeI/edit?fbclid=IwAR3OaRPLB2kXR-c67JIGYy0sFnNy1XmpRuWHeuMAU4ufsUEjtotPbpGF37c" className="text-white">Quy tắc hệ thống</a>
            </li>
          </ul>
        </Col>
        <Col md={6} lg={2}>
          <h5>Tài khoản của tôi</h5>
          <ul className="list-unstyled">
            <li><a href="/login" className="text-white">Đăng Nhập</a></li>
            {/* <li><a href="/shoppingcart" className="text-white">Giỏ Hàng</a></li> */}
            <li><a href="/profile" className="text-white">Tài Khoản Của Tôi</a></li>
          </ul>
        </Col>
        <Col md={6} lg={4}>
          <h5>Lưu ý</h5>
          <p>
            Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào, khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
