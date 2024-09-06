// ? Role based access control

const roleMiddleware = (role) => (req, res, next) => {
    if(req.user.role !== role){
        return res.status(403).json({error: "Access Denied"})
    }
    next()
}

export default roleMiddleware