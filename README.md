Authentication API 
Giới thiệu

Dự án cung cấp API xác thực người dùng với các chức năng:

Đăng ký người dùng mới

Đăng nhập

Xác thực JWT

Lưu trữ người dùng trong MongoDB

Công nghệ sử dụng

Node.js với Express.js để xây dựng API

MongoDB để lưu trữ dữ liệu

bcryptjs để mã hóa mật khẩu

jsonwebtoken (JWT) để xác thực

dotenv để quản lý biến môi trường

Cài đặt dependencies

 npm install

Cấu hình biến môi trường

Tạo file .env và thêm các biến sau:

MONGO_URI=mongodb://localhost:27017/authDB
JWT_SECRET=supersecretkey
PORT=5000
trình biên dịch từ TS sang JS
npm run build 


Chạy Server
npm run start

Server sẽ chạy tại http://localhost:5000
 API Endpoints

 Đăng ký người dùng

Endpoint: /api/auth/register

Method: POST

Request Body:

{
  "username": "mien1",
  "email": "admi1n@example.com",
  "password": "mien220221",
  "role": "admin"
}

Response:

{
  "message": "User registered successfully"
}

Đăng nhập

Endpoint: /api/auth/login

Method: POST

Request Body:

{
  "email": "admi1n@example.com",
  "password": "mien220221"
}

Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzIwMGVlODBiY2QxNjI5OTBiMmJhYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MDc2NzU3NywiZXhwIjoxNzQwNzcxMTc3fQ.RrEqgWY5ca4DqWFHCw6Y4zeq1F3f-YajkQ4FLJLopkg",
    "user": {
        "id": "67c200ee80bcd162990b2bab",
        "username": "mien1",
        "email": "admi1n@example.com",
        "role": "admin"
    }
}
