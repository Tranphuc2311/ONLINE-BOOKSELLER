import React, { useContext } from 'react';
import { MyContext } from '../contexts/MyContext';
import '../components/css/Footer.css';

const Footer = () => {
	const { isLoggedIn } = useContext(MyContext);
	return (
		<footer className="footer mt-auto py-3 border-top bg-light">
			{isLoggedIn ? null : (
				<div className="container text-center mt-3">
					<h2 className="fw-bold mb-3">Tham gia Newsletter của chúng tôi</h2>
					<h4 className="fw-bold">Đăng ký để là người đầu tiên nhận thông tin về các khuyến mãi độc quyền, ưu đãi đặc biệt và bộ sưu tập sắp tới</h4>
				</div>
			)}
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-3 col-sm-6">
						<h4 className='mb-4'>Khám phá</h4>
						<ul className='list-unstyled'>
							<li className='mb-4'>Về chúng tôi</li>
							<li className='mb-4'>Dấu trang</li>
							<li className='mb-4'>Đăng nhập/Tham gia</li>
						</ul>
					</div>
					<div className="col-md-3 col-sm-6">
						<h4 className='mb-4'>Dịch vụ khách hàng</h4>
						<ul className='list-unstyled'>
							<li className='mb-4'>Trung tâm trợ giúp</li>
							<li className='mb-4'>Thông báo thu hồi sản phẩm</li>
							<li className='mb-4'>Khả dụng với khách hàng khuyết tật</li>
							<li className='mb-4'>Liên hệ chúng tôi</li>
							<li className='mb-4'>Đón tại cửa hàng</li>
						</ul>
					</div>
					<div className="col-md-3 col-sm-6">
						<h4 className='mb-4'>Chính sách</h4>
						<ul className='list-unstyled'>
							<li className='mb-4'>Chính sách hoàn trả</li>
							<li className='mb-4'>Điều khoản sử dụng</li>
							<li className='mb-4'>Bảo mật</li>
							<li className='mb-4'>Quyền riêng tư</li>
						</ul>
					</div>
					<div className="col-md-3 col-sm-6">
						<h4 className='mb-4'>Thể loại</h4>
						<ul className='list-unstyled'>
							<li className='mb-4'>Hành động</li>
							<li className='mb-4'>Hài hước</li>
							<li className='mb-4'>Kịch tính</li>
							<li className='mb-4'>Kinh dị</li>
							<li className='mb-4'>Trẻ em</li>
						</ul>
					</div>
				</div>
			</div>
		</footer >
	);
};

export default Footer;
