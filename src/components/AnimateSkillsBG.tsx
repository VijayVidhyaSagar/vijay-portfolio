import React, { useMemo } from 'react';
import { motion, type MotionProps } from 'framer-motion';

// Define the skill items and their initial size/color
const SKILL_ITEMS: { name: string; size: number }[] = [
    { name: 'HTML', size: 100 },
    { name: 'CSS', size: 90 },
    { name: 'JavaScript', size: 80 },
    { name: 'Python', size: 160 },
    { name: 'Automation', size: 100},
    { name: 'AI Prompting', size: 120},
    { name: 'Adaptive Learning', size: 150},
    { name: 'Java', size: 80 },
    { name: 'Snowflake', size: 140 },
    { name: 'Teradata', size: 130 },
    { name: 'Jira Atlassian', size: 80},
    { name: 'BMC Control-M', size: 70},
    { name: 'ServiveNow.com', size: 100},
    { name: 'SQL', size: 100 },
    { name: 'Git', size: 120 },
    { name: 'Github Copilot', size: 130},
    { name: 'GCP', size: 80 },
    { name: 'Docker', size: 70 },
    { name: 'Big Query', size: 110 },
    { name: 'React', size: 100 },
    { name: 'TypeScript', size: 80 },
    { name: 'Tailwind CSS', size: 90 },
    { name: 'Framer Motion', size: 80 },
    { name: 'Node.js', size: 80 },
    { name: 'Figma', size: 120 },
    // Add all your core skills here
];

interface AnimatedSkillProps {
    key: number;
    initial: MotionProps['initial'];
    animate: MotionProps['animate'];
    transition: MotionProps['transition'];
    style: React.CSSProperties;
    name: string;
    shapeClass: string;
    morphTransition: MotionProps['transition'];
}

const AnimatedSkillsBackground: React.FC = () => {
    // A subtle, continuous morphing animation for the border-radius
    // This needs to be outside useMemo to be accessible in the JSX below.
    const morphAnimation = {
        borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 50% 60% 50% 40%",
            "30% 70% 60% 40% / 70% 40% 50% 60%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
        ],
    };

    const animatedSkills = useMemo<AnimatedSkillProps[]>(() => {
        return SKILL_ITEMS.map((skill, index) => {
            // Generate unique, random starting positions and animation properties
            const initialX = Math.random() * 1000 - 500; // -500 to 500 (off-center start)
            const initialY = Math.random() * 1000 - 500;

            const finalOpacity = 0.3 + Math.random() * 0.3; // Increased opacity: range [0.4, 0.7]

            // Array of different border-radius classes for various shapes
            const shapeClasses = [
                'rounded-full', // Circle
                'rounded-3xl',  // Squircle
                'rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]', // Blob 1
                'rounded-[70%_30%_40%_60%_/_60%_70%_30%_40%]', // Blob 2
                'rounded-[30%_70%_60%_40%_/_70%_40%_50%_60%]', // Blob 3
            ];

            // Define the path for the skill to "wander"
            const wanderAnimation = {
                x: [initialX, initialX + Math.random() * 300 - 150, initialX],
                y: [initialY, initialY + Math.random() * 200 - 100, initialY],
                rotate: [0, Math.random() * 20 - 10, 0], // Subtle rotation
                opacity: [0, finalOpacity, 0], // Fade in and out during the animation cycle
            };

            // Define the duration for the animation cycle
            const duration = 15 + Math.random() * 10; // 15 to 25 seconds for a slow float

            return {
                key: index,
                name: skill.name,
                shapeClass: shapeClasses[index % shapeClasses.length], // Cycle through shapes
                initial: { x: initialX, y: initialY, opacity: 0 }, // Start invisible
                animate: wanderAnimation,
                transition: {
                    duration: duration,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: Math.random() * 2, // Stagger the fade-in of each bubble
                },
                morphTransition: {
                    borderRadius: { duration: 6 + Math.random() * 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                },
                style: {
                    width: skill.size,
                    height: skill.size,
                    fontSize: skill.size / 6, // Font size scales with bubble size
                    willChange: 'transform, opacity', // Performance optimization
                },
            };
        });
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {animatedSkills.map(({ name, shapeClass, morphTransition, ...rest }) => (
                <motion.div
                    //key={name}
                    {...rest}
                    className={`absolute font-bold flex items-center justify-center text-sky-300 dark:text-sky-200 bg-blue-500/10 dark:bg-indigo-500/10 border border-blue-500/20 dark:border-indigo-500/20 whitespace-nowrap ${shapeClass}`}
                    // Fix: Ensure 'animate' and 'transition' are object types before spreading
                    animate={{ ...(rest.animate as object), borderRadius: morphAnimation.borderRadius }}
                    transition={{ ...(rest.transition as object), ...morphTransition }}
                >
                    {name}
                </motion.div>
            ))}
        </div>
    );
};

export default AnimatedSkillsBackground;
