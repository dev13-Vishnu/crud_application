import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const admin = (req, res, next) => {
    if(!req.user || !req.user.isAdmin) {
        return res.status(403).json({message:"Access denied. Admins only!"});
    }
    next();
}

export {admin, protect} ;
