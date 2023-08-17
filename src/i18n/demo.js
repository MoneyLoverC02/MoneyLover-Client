import i18n from 'i18next';
import {initReactI18next} from "react-i18next"

const resources = {
    En: {
        translation: {
            "addTrasactions": "Add Trasactions",
            "Trasactions" : "Trasactions",
            "Report" : "Report",
            "Budget" : "Budget",
            "LastMonth" : "Last Month",
            "This Month" : "This Month",
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
            "transferMoney": "TRANFER MONEY",
            "shareWallet": "SHARE WALLET",
            "excludedFromTotal": "Excluded from Total",
            "leave": "Leave",
            "edit": "EDIT",
            "User Account":"User Account"
        },
    },
        Vi: {
            translation: {
                "addTrasactions": "Thêm giao dịch",
                "Trasactions" :"Giao dịch",
                "Report" :"Báo cáo",
                "Budget" :"Ngân sách",
                "LastMonth" :"Tháng sau",
                "This Month" :"Tháng này",
                "Future" :"Tương lai",
                "Inflow" :"Dòng vào",
                "Outflow" :"Chảy ra",
                "z" :"XEM BÁO CÁO TRONG GIAI ĐOẠN NÀY",
                "Add more details" :"Thêm chi tiết",
                "Cancel" : "Hủy bỏ",
                "Save" :"Lưu",
                "My Account" :"Tài khoản của tôi",
                "My Wallets" :"Ví của tôi",
                "SIGN OUT" :"ĐĂNG XUẤT",
                "DELETE" :"XÓA",
                "Edit password" :"chỉnh sửa mật khẩu",
                "Your password" :"Mật khẩu của bạn",
                "New Password" :"mật khẩu mới",
                "Confirm New Password" :"Xác nhận mật khẩu mới",
                "Change" :"Thay đổi",
                "Total monney": "Tổng số tiền",
                "select Wallet": "Chọn Ví",
                "ADD WALLET": "THÊM VÍ",
                "walletDetails": "Chi tiết ví",
                "archived": " Lưu trữ",
                "unarchived": "Đã Lưu trữ",
                "transferMoney": "CHUYỂN TIỀN",
                "shareWallet": "CHIA SẺ VÍ",
                "excludedFromTotal": "Loại khỏi Tổng",
                "owner": "Chủ sở hữu",
                "using": "Đang sử dụng",
                "viewer": "Người xem",
                "leave": "Rời khỏi",
                "edit": "CHỈNH SỬA",
                "User Account":"Tài khoản người dùng"
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