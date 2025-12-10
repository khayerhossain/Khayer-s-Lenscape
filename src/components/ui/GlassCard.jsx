import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", ...props }) => {
    return (
        <motion.div
            className={`glass p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
