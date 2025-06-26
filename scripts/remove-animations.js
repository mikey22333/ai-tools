#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files that contain motion animations
const filesToUpdate = [
  'app/categories/[categoryId]/page.tsx',
  'app/top-picks/page.tsx',
  'components/EditorsPicks.tsx',
  'components/ToolsDirectory.tsx'
];

function removeMotionAnimations(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Remove motion import
  content = content.replace(/import \{ motion \} from 'framer-motion'\n/g, '');
  content = content.replace(/, motion/g, '');
  content = content.replace(/motion, /g, '');
  
  // Replace motion.div with div and remove animation props
  content = content.replace(/<motion\.div[^>]*>/g, (match) => {
    // Extract className and other non-animation props
    const classMatch = match.match(/className="([^"]*)"/);
    const className = classMatch ? ` className="${classMatch[1]}"` : '';
    
    // Extract key prop
    const keyMatch = match.match(/key={([^}]*)}/);
    const key = keyMatch ? ` key={${keyMatch[1]}}` : '';
    
    return `<div${key}${className}>`;
  });
  
  // Replace closing motion.div tags
  content = content.replace(/<\/motion\.div>/g, '</div>');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Updated: ${filePath}`);
}

// Update all files
filesToUpdate.forEach(removeMotionAnimations);

console.log('Motion animations removed from all files!');
