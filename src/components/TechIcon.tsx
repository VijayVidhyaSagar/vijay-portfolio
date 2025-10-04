import React, { useState, useEffect, useRef } from 'react';

interface TechIconProps {
  tech: string;
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tech, className }) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const techKey = tech.toLowerCase().trim();

    // Handle special cases or remappings
    const remapping: { [key: string]: string } = {
      'html': 'html5',
      'css': 'css3',
      'node.js': 'nodejs',
      'express.js': 'express',
      'bmc control-m': 'bmccontrolm',
      'ctm automation': 'automate',
      'web app dev': 'webdev',
      'dba': 'database',
      'dba operations': 'database',
      'teradata bar': 'teradata',
      'teradata viewpoint': 'teradata',
      'access management': 'access',
      'change management': 'change',
      'power automate': 'automate',
      'infrastructure security': 'security',
      'ip whitelisting': 'internet',
      'servicenow': 'servicenow',
      'jira': 'jira',
      'linux': 'linux'
    };

    let fileName: string;
    if (techKey in remapping) {
      fileName = remapping[techKey];
    } else {
      // Default conversion for names not in remapping
      fileName = techKey.replace(/\s+/g, '-').replace(/\./g, '');
    }

    import(`../assets/logos/${fileName}.svg`)
      .then(module => {
        if (isMounted.current) setIconSrc(module.default);
      })
      .catch(() => import('../assets/logos/generic.svg').then(module => {
        if (isMounted.current) setIconSrc(module.default);
      }));

    return () => { isMounted.current = false; };
  }, [tech]);

  if (!iconSrc) return <div className={className} />; // Placeholder

  return <img src={iconSrc} alt={`${tech} icon`} className={className} />;
};

export default TechIcon;