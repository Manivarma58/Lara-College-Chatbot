import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Determine screen display time depending on if it has been seen before
        const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");

        if (hasSeenPreloader) {
            // Very fast or skip for repeat visits in the same session, but for demonstration 
            // we'll run it every time. If you want to only show it once per tab, uncomment this:
            // setIsVisible(false);
            // onComplete();
            // return;
        }

        sessionStorage.setItem("hasSeenPreloader", "true");

        // Hide preloader after a delay
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for exit animation to finish
        }, 2200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <motion.div
                        className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-widest text-center px-4 leading-tight uppercase flex flex-col items-center gap-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-foreground tracking-[0.2em]"
                        >
                            Vignan's Lara
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            className="text-gradient-gold tracking-[0.3em]"
                        >
                            AI Chatbot
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <div className="w-2 h-2 rounded-full gradient-gold animate-bounce shadow-[0_0_10px_rgba(255,215,0,0.5)]" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full gradient-gold animate-bounce shadow-[0_0_10px_rgba(255,215,0,0.5)]" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full gradient-gold animate-bounce shadow-[0_0_10px_rgba(255,215,0,0.5)]" style={{ animationDelay: "300ms" }} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
