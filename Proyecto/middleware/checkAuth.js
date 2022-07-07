const checkAuth = async (req, res, next) => {
    if (!process.env.ADMIN){
        const error = new Error('Unauthorized');
        return res.status(401).json({msg: error.message});
    }
    next();
}

export default checkAuth;