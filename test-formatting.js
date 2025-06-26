// Test the bold formatting logic
function testFormatting() {
  const testText = "This is **bold text** and this is normal text with **another bold** section.";
  
  console.log("Original text:", testText);
  
  // Simulate the formatting logic
  let result = [];
  let lastIndex = 0;
  
  const boldRegex = /\*\*(.*?)\*\*/g;
  let match;
  
  while ((match = boldRegex.exec(testText)) !== null) {
    // Add text before the bold part
    if (match.index > lastIndex) {
      result.push({ type: 'text', content: testText.slice(lastIndex, match.index) });
    }
    
    // Add the bold part
    result.push({ type: 'bold', content: match[1] });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after the last bold part
  if (lastIndex < testText.length) {
    result.push({ type: 'text', content: testText.slice(lastIndex) });
  }
  
  console.log("Parsed result:", result);
  
  // Test with HTML representation
  const htmlResult = result.map(item => 
    item.type === 'bold' ? `<strong>${item.content}</strong>` : item.content
  ).join('');
  
  console.log("HTML result:", htmlResult);
}

testFormatting();
