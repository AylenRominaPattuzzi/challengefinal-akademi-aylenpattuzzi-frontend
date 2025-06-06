export const WithProtectedRoute = ({roles, component}) => {
    const userRole = localStorage.getItem('role')
    if(!roles.includes(userRole)){
        window.location.href = "/login"
    }
    return component
}