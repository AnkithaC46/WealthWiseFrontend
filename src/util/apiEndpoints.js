export const BASE_URL="https://wealthwise-mt5w.onrender.com/api/v1.0"

const CLOUDINARY_CLOUD_NAME="dc52ikhfe";
export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO:"/profile",
    GET_ALL_CATEGORIES:"/categories",
    ADD_CATEGORY:"/categories",
    UPDATE_CATEGORY:(categoryId)=> `/categories/${categoryId}`,
    GET_ALL_INCOMES:"/incomes",
    CATEGORY_BY_TYPE:(type)=>`/categories/${type}`,
    ADD_INCOME:"/incomes",
    DELETE_INCOME:(id)=>`incomes/${id}`,
    INCOME_EXCEL_DOWNLOAD:"/incomes/download",
    EMAIL_INCOME:"/incomes/send-email",
    GET_ALL_EXPENSE:"/expenses",
    ADD_EXPENSE:"/expenses",
    DELETE_EXPENSE:(id)=>`expenses/${id}`,
    EXPENSE_EXCEL_DOWNLOAD:"/expenses/download",
    EMAIL_EXPENSE:"/expenses/send-email",
    APPLY_FILTERS:"/filter",
    DASHBOARD_DATA:"/dashboard",
    UPLOAD_IMAGE:`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}
