import i18n from 'i18next';
import {initReactI18next} from "react-i18next"

const resources = {
    En: {
        translation: {
            "addTrasactions": "Add Transactions",
            "Trasactions" : "Transactions",
            "Report" : "Report",
            "Budget" : "Budget",
            "LastMonth" : "Last Month",
            "This Month" : "This Month",
            "This month" : "This Month",
            "Future" : "Future",
            "Inflow" : "Inflow",
            "Outflow" : "Outflow",
            "z" : "VIEW REPORT FOR THIS PERIOD",
            "Add more details" : "Add more details",
            "Cancel" : "Cancel",
            "Save" : "Save",
            "My Account" : "My Account",
            "My Wallets" : "My Wallets",
            "SIGN OUT" : "SIGN OUT",
            "DELETE" : "DELETE",
            "Edit password" : "Edit password",
            "Your password" : "Your password",
            "New Password" : "New Password",
            "Confirm New Password" : "Confirm New Password",
            "Change" : "Change",
            "Total monney": "Total money",
            "select Wallet": "Select Wallet",
            "ADD WALLET": "ADD WALLET",
            "walletDetails": "Wallet details",
            "archived": "Archived",
            "unarchived": "Unarchived",
            "transferMoney": "TRANSFER MONEY",
            "shareWallet": "SHARE WALLET",
            "excludedFromTotal": "Excluded from Total",
            "leave": "Leave",
            "edit": "EDIT",
            "User Account":"User Account",
            "Delete can't get it back ^^":"Delete can't get it back ^^",
            "Are you sure you want to delete this account?":"Are you sure you want to delete this account?",
            "Sunday": "Sunday",
            "Monday": "Monday",
            "Tuesday": "Tuesday",
            "Wednesday": "Wednesday",
            "Thursday": "Thursday",
            "Friday": "Friday",
            "Saturday": "Saturday",
            "Water Bill": "Water Bill",
            "Transportation": "Transportation",
            "Salary": "Salary",
            "Rentals": "Rentals",
            "Other Expense": "Other Expense",
            "Pets": "Pets",
            "Other Income": "Other Income",
            "Incoming Transfer": "Incoming Transfer",
            "Outgoing Transfer": "Outgoing Transfer",
            "Fun Money": "Fun Money",
            "Food & Beverage": "Food & Beverage",
            "Fitness": "Fitness",
            "Electricity Bill": "Electricity Bill",
            "Collect Interest": "Collect Interest",
            "Transaction details": "Transaction details",
            "Are you sure you want to delete this wallet?": "Are you sure  want to delete this wallet?",
            "Are you sure want to delete this account?":"Are you sure want to delete this account?",
            "Add More Details": "Add More Details",
            "Amount Of Money": "Amount Of Money",
            "Note": "Note",
            "No transactions": "No transactions",
            "Transaction Wallet": "Transaction Wallet",
            "Select Wallet": "Select Wallet",
            "Destination Wallet": "Destination Wallet",
            "Category": "Category",
            "Select Category": "Select Category",
            "All Category": "All Category",
            "Debt/Loan": "Debt/Loan",
            "Expense": "Expense",
            "Income": "Income",
            "Date": "Date",
            "Update transaction": "Update transaction",
            "Search for transaction": "Search for transaction",
            "Amount": "Amount",
            "Edit Wallet": "Edit a wallet ",
            "Wallet Name": "Wallet name",
            "Initial Balance": "Initial Balance",
            "Accept Terms": "Accept terms",
            "Duplicate Wallet Name": "Wallet name already exists!",
            "Catogories": "Categories",
            "Currency": "Currency",
            "Select Currency": "Select Currency",
            "Select Time Range": "Select Time Range",
            "Last month": "Last month",
            "Last 3 months": "Last 3 months",
            "Last 6 months": "Last 6 months",
            "This year": "This year",
            "Opening balance": "Opening balance",
            "Ending balance": "Ending balance",
            "Net Income": "Net Income",
            "income": "income",
            "expense": "expense",
            "Debt": "Debt",
            "Loan": "Loan",
            "Other": "Other",
            "Select time range": "Select time range",
            "Add a wallet first!":"Add a wallet first!",
        },
    },
        Vi: {
            translation: {
                "Edit Wallet": "Chỉnh sửa ví ",
                "Wallet Name": "Tên ví",
                "Initial Balance": "Số dư ban đầu",
                "Accept Terms": "Chấp nhận điều khoản",
                "Duplicate Wallet Name": "Tên ví đã tồn tại!",
                "Category": "Danh mục",
                "Amount": "Số tiền",
                "Search for transaction": "Tìm kiếm giao dịch",
                "Date": "Ngày",
                "Select Category": "Chọn Danh mục",
                "All Category": "Tất cả Danh mục",
                "Debt/Loan": "Nợ/Cho vay",
                "Expense": "Khoản chi",
                "Income": "Khoản thu",
                "addTrasactions": "Thêm giao dịch",
                "Update transaction": "Cập nhật giao dịch",
                "Trasactions" :"Giao dịch",
                "Report" :"Báo cáo",
                "Budget" :"Ngân sách",
                "LastMonth" :"Tháng trước",
                "This Month" :"Tháng này",
                "This month" :"Tháng này",
                "Future" :"Tương lai",
                "Inflow" :"Tổng các khoản thu",
                "Outflow" :"Tổng các khoản chi",
                "z" :"XEM BÁO CÁO TRONG GIAI ĐOẠN NÀY",
                "Add more details" :"Thêm chi tiết",
                "Cancel" : "Hủy bỏ",
                "Save" :"Lưu",
                "My Account" :"Tài khoản của tôi",
                "My Wallets" :"Ví của tôi",
                "SIGN OUT" :"ĐĂNG XUẤT",
                "DELETE" :"XÓA",
                "Edit password" :"Chỉnh sửa mật khẩu",
                "Your password" :"Mật khẩu của bạn",
                "New Password" :"Mật khẩu mới",
                "Confirm New Password" :"Xác nhận mật khẩu mới",
                "Change" :"Thay đổi",
                "Total monney": "Tổng số tiền",
                "select Wallet": "Chọn Ví",
                "ADD WALLET": "THÊM VÍ",
                "walletDetails": "Chi tiết ví",
                "archived": " Lưu trữ",
                "unarchived": "Không lưu trữ",
                "transferMoney": "CHUYỂN TIỀN",
                "shareWallet": "CHIA SẺ VÍ",
                "excludedFromTotal": "Danh sách ví",
                "leave": "Rời khỏi",
                "edit": "CHỈNH SỬA",
                "User Account":"Tài khoản người dùng",
                "Delete can't get it back ^^":"Xóa không lấy lại được đâu ^^",
                "Are you sure want to delete this account?":"Bạn có chắc muốn xóa tài khoản này?",
                "Sunday": "Chủ Nhật",
                "Monday": "Thứ Hai",
                "Tuesday": "Thứ Ba",
                "Wednesday": "Thứ Tư",
                "Thursday": "Thứ Năm",
                "Friday": "Thứ Sáu",
                "Saturday": "Thứ Bảy",
                "Water Bill": "Hóa Đơn Nước",
                "Transportation": "Phương Tiện",
                "Salary": "Lương",
                "Rentals": "Thuê Nhà",
                "Other Expense": "Khoản chi khác",
                "Pets": "Thú Cưng",
                "Other Income": "khoản thu khác",
                "Incoming Transfer": "Tiền Chuyển Đến",
                "Outgoing Transfer": "Tiền Chuyển Đi",
                "Fun Money": "Tiền Vui Chơi",
                "Food & Beverage": "Thực Phẩm & Đồ Uống",
                "Fitness": "Fitness",
                "Electricity Bill": "Hóa Đơn Điện",
                "Collect Interest": "Tiền Lãi",
                "Transaction details": "Chi tiết giao dịch",
                "Are you sure you want to delete this wallet?": "Bạn có chắc muốn xóa ví này?",
                "Are you sure want to delete this Transaction?": "Bạn có chắc muốn xóa giao dịch này?",
                "Add More Details": "Thêm Chi Tiết",
                "Amount Of Money": "Số Tiền",
                "Note": "Ghi Chú",
                "No transactions": "Không có giao dịch",
                "Transaction Wallet": "Ví Giao Dịch",
                "Select Wallet": "Chọn Ví",
                "Destination Wallet": "Chọn Ví ",
                "Catogories": "Thể Loại",
                "Currency": "Tiền tệ ",
                "Select Currency": "Chọn loại tiền tệ ",
                "Select Time Range": "Chọn khoảng thời gian",
                "Last month": "Tháng trước",
                "Last 3 months": "3 tháng trước",
                "Last 6 months": "6 tháng trước",
                "This year": "Năm nay",
                "Opening balance": "Số dư đầu kỳ",
                "Ending balance": "Số dư cuối kỳ",
                "Net Income": "Thu nhập ròng",
                "income": "Thu nhập",
                "expense": "Chi phí",
                "Debt": "Nợ",
                "Loan": "Khoản vay",
                "Other": "Khác",
                "Select time range": "Chọn khoảng thời gian",
                "Add a wallet first!":"Thêm ví trước!"
            }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "Vi",
    fallbackLng: "Vi",
    interpolation: {
        escapeValue: false
    }
}).then(r => {})