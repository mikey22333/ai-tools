-- Safe insertion of Art & Creative Design tools
-- This script allows the same tool to exist in multiple categories
-- Uses ON CONFLICT (id, category_id) DO NOTHING to avoid duplicates within the same category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending
) VALUES   -- Popular tools that might already exist in other categories (only select few as featured)
  ('midjourney', 'Midjourney', 'AI-powered image generation tool that creates stunning artwork from text descriptions', 'https://midjourney.com', 'art-creative-design', 'paid', ARRAY['text-to-image', 'ai-art', 'discord-bot'], true, true),
  ('dall-e-2', 'DALL-E 2', 'OpenAI''s powerful AI system that creates realistic images from text descriptions', 'https://openai.com/dall-e-2', 'art-creative-design', 'paid', ARRAY['text-to-image', 'openai', 'realistic'], false, true),
  ('stable-diffusion', 'Stable Diffusion', 'Open-source AI model for generating images from text prompts', 'https://stability.ai/stable-diffusion', 'art-creative-design', 'free', ARRAY['text-to-image', 'open-source', 'customizable'], false, true),
  -- New Art & Creative Design specific tools
  ('runway-ml', 'Runway ML', 'AI-powered creative tools for video editing, image generation, and more', 'https://runwayml.com', 'art-creative-design', 'freemium', ARRAY['video-editing', 'image-generation', 'ai-video'], false, true),
  ('artbreeder', 'Artbreeder', 'Collaborative AI art creation platform for generating and evolving images', 'https://artbreeder.com', 'art-creative-design', 'freemium', ARRAY['image-generation', 'ai-art', 'collaborative'], false, false),
  ('deep-dream-generator', 'Deep Dream Generator', 'AI-powered psychedelic image transformation tool', 'https://deepdreamgenerator.com', 'art-creative-design', 'freemium', ARRAY['image-transformation', 'psychedelic', 'ai-art'], false, false),
  ('wombo-dream', 'WOMBO Dream', 'AI art generator that creates stunning artwork from text prompts', 'https://dream.wombo.art', 'art-creative-design', 'freemium', ARRAY['text-to-art', 'mobile-app', 'ai-art'], false, true),
  ('nightcafe-creator', 'NightCafe Creator', 'AI art generator with multiple algorithms and styles', 'https://nightcafe.studio', 'art-creative-design', 'freemium', ARRAY['ai-art', 'multiple-algorithms', 'community'], false, false),
  ('starryai', 'StarryAI', 'AI art generator app for creating unique artworks', 'https://starryai.com', 'art-creative-design', 'freemium', ARRAY['mobile-app', 'ai-art', 'unique-styles'], false, false),
  ('jasper-art', 'Jasper Art', 'AI art generator integrated with Jasper AI writing platform', 'https://jasper.ai/art', 'art-creative-design', 'paid', ARRAY['integrated-platform', 'ai-art', 'business'], false, false),
  ('deep-ai-art', 'DeepAI Art', 'Simple AI art generator with various artistic styles', 'https://deepai.org/machine-learning-model/artistic-style-transfer', 'art-creative-design', 'freemium', ARRAY['style-transfer', 'simple-interface', 'artistic'], false, false),
  ('ai-painter', 'AI Painter', 'Professional AI painting tool for digital artists', 'https://aipainter.app', 'art-creative-design', 'paid', ARRAY['digital-painting', 'professional', 'brushes'], false, false),
  ('neural-love', 'Neural Love', 'AI-powered photo and art enhancement platform', 'https://neural.love', 'art-creative-design', 'freemium', ARRAY['photo-enhancement', 'art-restoration', 'upscaling'], false, false),
  ('let-enhance', 'Let''s Enhance', 'AI image upscaling and enhancement service', 'https://letsenhance.io', 'art-creative-design', 'freemium', ARRAY['image-upscaling', 'enhancement', 'photo-quality'], false, false),
  ('remove-bg', 'Remove.bg', 'AI-powered background removal tool', 'https://remove.bg', 'art-creative-design', 'freemium', ARRAY['background-removal', 'photo-editing', 'api'], false, true),
  ('canva-magic-design', 'Canva Magic Design', 'AI-powered design suggestions and automation in Canva', 'https://canva.com/magic-design', 'art-creative-design', 'freemium', ARRAY['design-automation', 'templates', 'suggestions'], false, false),
  ('adobe-sensei', 'Adobe Sensei', 'AI and machine learning platform powering Adobe Creative Suite', 'https://adobe.com/sensei', 'art-creative-design', 'paid', ARRAY['creative-suite', 'professional', 'ml-powered'], false, false),
  ('photomosh', 'PhotoMosh', 'AI-powered photo glitch and distortion effects', 'https://photomosh.com', 'art-creative-design', 'free', ARRAY['glitch-effects', 'distortion', 'artistic'], false, false),
  ('ai-photo-enhancer', 'AI Photo Enhancer', 'Automatic photo enhancement using artificial intelligence', 'https://aiphotoenhancer.com', 'art-creative-design', 'freemium', ARRAY['photo-enhancement', 'automatic', 'quality-improvement'], false, false),
  ('deepart-io', 'DeepArt.io', 'Neural network-based artistic style transfer', 'https://deepart.io', 'art-creative-design', 'freemium', ARRAY['style-transfer', 'neural-networks', 'artistic'], false, false),
  ('prisma', 'Prisma', 'AI-powered photo editing app with artistic filters', 'https://prisma-ai.com', 'art-creative-design', 'freemium', ARRAY['photo-filters', 'mobile-app', 'artistic-effects'], false, false),
  ('luminar-ai', 'Luminar AI', 'AI-powered photo editing software', 'https://skylum.com/luminar', 'art-creative-design', 'paid', ARRAY['photo-editing', 'desktop-software', 'ai-enhancement'], false, false),
  ('topaz-gigapixel', 'Topaz Gigapixel AI', 'AI-powered image upscaling software', 'https://topazlabs.com/gigapixel-ai', 'art-creative-design', 'paid', ARRAY['image-upscaling', 'desktop-software', 'professional'], false, false),
  ('ai-art-generator-free', 'AI Art Generator Free', 'Free online AI art generation tool', 'https://aiartgenerator.org', 'art-creative-design', 'free', ARRAY['free-tool', 'online-generator', 'simple'], false, false),
  ('deep-nostalgia', 'Deep Nostalgia', 'AI tool to animate old family photos', 'https://myheritage.com/deep-nostalgia', 'art-creative-design', 'freemium', ARRAY['photo-animation', 'family-photos', 'nostalgia'], false, false),
  ('ai-image-colorizer', 'AI Image Colorizer', 'Automatic colorization of black and white photos', 'https://imagecolorizer.com', 'art-creative-design', 'freemium', ARRAY['photo-colorization', 'restoration', 'historical'], false, false),
  ('vance-ai', 'Vance AI', 'AI-powered image processing and enhancement suite', 'https://vanceai.com', 'art-creative-design', 'freemium', ARRAY['image-processing', 'enhancement-suite', 'batch-processing'], false, false),
  ('bigjpg', 'Bigjpg', 'AI image enlarger for anime and illustrations', 'https://bigjpg.com', 'art-creative-design', 'freemium', ARRAY['image-enlarging', 'anime', 'illustrations'], false, false),
  ('face-depixelizer', 'Face Depixelizer', 'AI tool to enhance pixelated face images', 'https://github.com/tg-bomze/Face-Depixelizer', 'art-creative-design', 'free', ARRAY['face-enhancement', 'depixelation', 'open-source'], false, false),
  ('artisto', 'Artisto', 'AI video and photo editor with artistic effects', 'https://artisto.my.com', 'art-creative-design', 'freemium', ARRAY['video-editing', 'artistic-effects', 'mobile-app'], false, false),
  ('deepfacelab', 'DeepFaceLab', 'Advanced deepfake creation software', 'https://github.com/iperov/DeepFaceLab', 'art-creative-design', 'free', ARRAY['deepfake', 'face-swap', 'open-source'], false, false),
  ('ai-cartoonizer', 'AI Cartoonizer', 'Transform photos into cartoon-style images', 'https://cartoonize-lkqov62dia-de.a.run.app', 'art-creative-design', 'free', ARRAY['cartoonization', 'photo-transformation', 'anime-style'], false, false),
  ('waifu2x', 'Waifu2x', 'AI-powered image upscaler for anime-style art', 'https://waifu2x.udp.jp', 'art-creative-design', 'free', ARRAY['anime-upscaling', 'image-enhancement', 'web-based'], false, false),
  ('deep-art-effects', 'Deep Art Effects', 'AI art filter app for photos and videos', 'https://deeparteffects.com', 'art-creative-design', 'freemium', ARRAY['art-filters', 'photo-video', 'mobile-desktop'], false, false),
  ('avatarify', 'Avatarify', 'Real-time face animation using AI', 'https://github.com/alievk/avatarify-python', 'art-creative-design', 'free', ARRAY['face-animation', 'real-time', 'open-source'], false, false),
  ('deepface', 'DeepFace', 'Lightweight face recognition and analysis library', 'https://github.com/serengil/deepface', 'art-creative-design', 'free', ARRAY['face-recognition', 'analysis', 'python-library'], false, false),
  ('ai-photo-restorer', 'AI Photo Restorer', 'Restore old and damaged photos using AI', 'https://aiphotorestorer.com', 'art-creative-design', 'freemium', ARRAY['photo-restoration', 'damage-repair', 'historical-photos'], false, false),
  ('super-resolution', 'Super Resolution', 'AI-based image super-resolution enhancement', 'https://github.com/idealo/image-super-resolution', 'art-creative-design', 'free', ARRAY['super-resolution', 'image-enhancement', 'open-source'], false, false),
  ('face-swap-online', 'Face Swap Online', 'Online face swapping tool using AI', 'https://faceswap.dev', 'art-creative-design', 'freemium', ARRAY['face-swap', 'online-tool', 'entertainment'], false, false),
  ('ai-background-remover', 'AI Background Remover', 'Automatic background removal for images', 'https://backgroundremover.app', 'art-creative-design', 'freemium', ARRAY['background-removal', 'automatic', 'batch-processing'], false, false),
  ('style-transfer-pytorch', 'Style Transfer PyTorch', 'Neural style transfer implementation', 'https://github.com/pytorch/examples/tree/master/fast_neural_style', 'art-creative-design', 'free', ARRAY['style-transfer', 'pytorch', 'neural-networks'], false, false),
  ('ai-sketch-converter', 'AI Sketch Converter', 'Convert photos to pencil sketches using AI', 'https://sketch.io', 'art-creative-design', 'freemium', ARRAY['sketch-conversion', 'pencil-drawing', 'artistic'], false, false),
  ('deepdream', 'DeepDream', 'Google''s neural network visualization tool', 'https://github.com/google/deepdream', 'art-creative-design', 'free', ARRAY['neural-visualization', 'google', 'psychedelic'], false, false),
  ('ai-anime-generator', 'AI Anime Generator', 'Generate anime-style characters and art', 'https://waifulabs.com', 'art-creative-design', 'free', ARRAY['anime-generation', 'character-creation', 'waifu'], false, false),
  ('photo-colorizer-ai', 'Photo Colorizer AI', 'Colorize black and white photos automatically', 'https://photocolorizer.com', 'art-creative-design', 'freemium', ARRAY['photo-colorization', 'automatic', 'historical'], false, false),
  ('ai-portrait-generator', 'AI Portrait Generator', 'Generate realistic portraits using AI', 'https://portraitai.app', 'art-creative-design', 'paid', ARRAY['portrait-generation', 'realistic', 'professional'], false, false),
  ('neural-filters-photoshop', 'Neural Filters (Photoshop)', 'AI-powered filters in Adobe Photoshop', 'https://helpx.adobe.com/photoshop/using/neural-filters.html', 'art-creative-design', 'paid', ARRAY['photoshop', 'neural-filters', 'professional'], false, false),
  ('ai-face-enhancer', 'AI Face Enhancer', 'Enhance and restore face details in photos', 'https://faceenhancer.ai', 'art-creative-design', 'freemium', ARRAY['face-enhancement', 'detail-restoration', 'portrait'], false, false),
  ('deepfakes-web', 'DeepFakes Web', 'Browser-based deepfake creation tool', 'https://deepfakesweb.com', 'art-creative-design', 'paid', ARRAY['deepfakes', 'browser-based', 'face-swap'], false, false),
  ('ai-art-shop', 'AI Art Shop', 'Marketplace for AI-generated art and tools', 'https://aiartshop.com', 'art-creative-design', 'freemium', ARRAY['marketplace', 'ai-art', 'commercial'], false, false),
  ('style-gan', 'StyleGAN', 'State-of-the-art generative adversarial network', 'https://github.com/NVlabs/stylegan', 'art-creative-design', 'free', ARRAY['gan', 'image-generation', 'nvidia'], false, false),
  ('ai-music-video', 'AI Music Video', 'Generate music videos using AI', 'https://aiva.ai/music-video', 'art-creative-design', 'paid', ARRAY['music-video', 'ai-generation', 'multimedia'], false, false),
  ('deepart-ai', 'DeepArt AI', 'Transform photos into famous art styles', 'https://deepart.ai', 'art-creative-design', 'freemium', ARRAY['art-styles', 'photo-transformation', 'famous-artists'], false, false),
  ('ai-logo-maker', 'AI Logo Maker', 'Create professional logos using AI', 'https://logomaker.com/ai', 'art-creative-design', 'freemium', ARRAY['logo-design', 'branding', 'business'], false, false)
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'art-creative-design'
) 
WHERE id = 'art-creative-design';
-- This script allows the same tool to exist in multiple categories
-- Uses ON CONFLICT (id, category_id) DO NOTHING to avoid duplicates within the same category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, editors_pick, trending
) VALUES
  ('runway-ml', 'Runway ML', 'AI-powered creative tools for video editing, image generation, and more', 'https://runwayml.com', 'art-creative-design', 'freemium', ARRAY['video-editing', 'image-generation', 'ai-video'], false, false, true),
  ('artbreeder', 'Artbreeder', 'Collaborative AI art creation platform for generating and evolving images', 'https://artbreeder.com', 'art-creative-design', 'freemium', ARRAY['image-generation', 'ai-art', 'collaborative'], false, false, false),
  ('deep-dream-generator', 'Deep Dream Generator', 'AI-powered psychedelic image transformation tool', 'https://deepdreamgenerator.com', 'art-creative-design', 'freemium', ARRAY['image-transformation', 'psychedelic', 'ai-art'], false, false, false),
  ('wombo-dream', 'WOMBO Dream', 'AI art generator that creates stunning artwork from text prompts', 'https://dream.wombo.art', 'art-creative-design', 'freemium', ARRAY['text-to-art', 'mobile-app', 'ai-art'], false, false, true),
  ('nightcafe-creator', 'NightCafe Creator', 'AI art generator with multiple algorithms and styles', 'https://nightcafe.studio', 'art-creative-design', 'freemium', ARRAY['ai-art', 'multiple-algorithms', 'community'], false, false, false),
  ('starryai', 'StarryAI', 'AI art generator app for creating unique artworks', 'https://starryai.com', 'art-creative-design', 'freemium', ARRAY['mobile-app', 'ai-art', 'unique-styles'], false, false, false),
  ('jasper-art', 'Jasper Art', 'AI art generator integrated with Jasper AI writing platform', 'https://jasper.ai/art', 'art-creative-design', 'paid', ARRAY['integrated-platform', 'ai-art', 'business'], false, false, false),
  ('deep-ai-art', 'DeepAI Art', 'Simple AI art generator with various artistic styles', 'https://deepai.org/machine-learning-model/artistic-style-transfer', 'art-creative-design', 'freemium', ARRAY['style-transfer', 'simple-interface', 'artistic'], false, false, false),
  ('ai-painter', 'AI Painter', 'Professional AI painting tool for digital artists', 'https://aipainter.app', 'art-creative-design', 'paid', ARRAY['digital-painting', 'professional', 'brushes'], false, false, false),
  ('neural-love', 'Neural Love', 'AI-powered photo and art enhancement platform', 'https://neural.love', 'art-creative-design', 'freemium', ARRAY['photo-enhancement', 'art-restoration', 'upscaling'], false, false, false),
  ('let-enhance', 'Let''s Enhance', 'AI image upscaling and enhancement service', 'https://letsenhance.io', 'art-creative-design', 'freemium', ARRAY['image-upscaling', 'enhancement', 'photo-quality'], false, false, false),
  ('remove-bg', 'Remove.bg', 'AI-powered background removal tool', 'https://remove.bg', 'art-creative-design', 'freemium', ARRAY['background-removal', 'photo-editing', 'api'], false, false, true),
  ('canva-magic-design', 'Canva Magic Design', 'AI-powered design suggestions and automation in Canva', 'https://canva.com/magic-design', 'art-creative-design', 'freemium', ARRAY['design-automation', 'templates', 'suggestions'], false, false, false),
  ('adobe-sensei', 'Adobe Sensei', 'AI and machine learning platform powering Adobe Creative Suite', 'https://adobe.com/sensei', 'art-creative-design', 'paid', ARRAY['creative-suite', 'professional', 'ml-powered'], false, true, false),
  ('photomosh', 'PhotoMosh', 'AI-powered photo glitch and distortion effects', 'https://photomosh.com', 'art-creative-design', 'free', ARRAY['glitch-effects', 'distortion', 'artistic'], false, false, false),
  ('ai-photo-enhancer', 'AI Photo Enhancer', 'Automatic photo enhancement using artificial intelligence', 'https://aiphotoenhancer.com', 'art-creative-design', 'freemium', ARRAY['photo-enhancement', 'automatic', 'quality-improvement'], false, false, false),
  ('deepart-io', 'DeepArt.io', 'Neural network-based artistic style transfer', 'https://deepart.io', 'art-creative-design', 'freemium', ARRAY['style-transfer', 'neural-networks', 'artistic'], false, false, false),
  ('prisma', 'Prisma', 'AI-powered photo editing app with artistic filters', 'https://prisma-ai.com', 'art-creative-design', 'freemium', ARRAY['photo-filters', 'mobile-app', 'artistic-effects'], false, false, false),
  ('luminar-ai', 'Luminar AI', 'AI-powered photo editing software', 'https://skylum.com/luminar', 'art-creative-design', 'paid', ARRAY['photo-editing', 'desktop-software', 'ai-enhancement'], false, false, false),
  ('topaz-gigapixel', 'Topaz Gigapixel AI', 'AI-powered image upscaling software', 'https://topazlabs.com/gigapixel-ai', 'art-creative-design', 'paid', ARRAY['image-upscaling', 'desktop-software', 'professional'], false, false, false),
  ('ai-art-generator-free', 'AI Art Generator Free', 'Free online AI art generation tool', 'https://aiartgenerator.org', 'art-creative-design', 'free', ARRAY['free-tool', 'online-generator', 'simple'], false, false, false),
  ('deep-nostalgia', 'Deep Nostalgia', 'AI tool to animate old family photos', 'https://myheritage.com/deep-nostalgia', 'art-creative-design', 'freemium', ARRAY['photo-animation', 'family-photos', 'nostalgia'], false, false, false),
  ('ai-image-colorizer', 'AI Image Colorizer', 'Automatic colorization of black and white photos', 'https://imagecolorizer.com', 'art-creative-design', 'freemium', ARRAY['photo-colorization', 'restoration', 'historical'], false, false, false),
  ('vance-ai', 'Vance AI', 'AI-powered image processing and enhancement suite', 'https://vanceai.com', 'art-creative-design', 'freemium', ARRAY['image-processing', 'enhancement-suite', 'batch-processing'], false, false, false),
  ('bigjpg', 'Bigjpg', 'AI image enlarger for anime and illustrations', 'https://bigjpg.com', 'art-creative-design', 'freemium', ARRAY['image-enlarging', 'anime', 'illustrations'], false, false, false),
  ('face-depixelizer', 'Face Depixelizer', 'AI tool to enhance pixelated face images', 'https://github.com/tg-bomze/Face-Depixelizer', 'art-creative-design', 'free', ARRAY['face-enhancement', 'depixelation', 'open-source'], false, false, false),
  ('artisto', 'Artisto', 'AI video and photo editor with artistic effects', 'https://artisto.my.com', 'art-creative-design', 'freemium', ARRAY['video-editing', 'artistic-effects', 'mobile-app'], false, false, false),
  ('deepfacelab', 'DeepFaceLab', 'Advanced deepfake creation software', 'https://github.com/iperov/DeepFaceLab', 'art-creative-design', 'free', ARRAY['deepfake', 'face-swap', 'open-source'], false, false, false),
  ('ai-cartoonizer', 'AI Cartoonizer', 'Transform photos into cartoon-style images', 'https://cartoonize-lkqov62dia-de.a.run.app', 'art-creative-design', 'free', ARRAY['cartoonization', 'photo-transformation', 'anime-style'], false, false, false),
  ('waifu2x', 'Waifu2x', 'AI-powered image upscaler for anime-style art', 'https://waifu2x.udp.jp', 'art-creative-design', 'free', ARRAY['anime-upscaling', 'image-enhancement', 'web-based'], false, false, false),
  ('deep-art-effects', 'Deep Art Effects', 'AI art filter app for photos and videos', 'https://deeparteffects.com', 'art-creative-design', 'freemium', ARRAY['art-filters', 'photo-video', 'mobile-desktop'], false, false, false),
  ('avatarify', 'Avatarify', 'Real-time face animation using AI', 'https://github.com/alievk/avatarify-python', 'art-creative-design', 'free', ARRAY['face-animation', 'real-time', 'open-source'], false, false, false),
  ('deepface', 'DeepFace', 'Lightweight face recognition and analysis library', 'https://github.com/serengil/deepface', 'art-creative-design', 'free', ARRAY['face-recognition', 'analysis', 'python-library'], false, false, false),
  ('ai-photo-restorer', 'AI Photo Restorer', 'Restore old and damaged photos using AI', 'https://aiphotorestorer.com', 'art-creative-design', 'freemium', ARRAY['photo-restoration', 'damage-repair', 'historical-photos'], false, false, false),
  ('super-resolution', 'Super Resolution', 'AI-based image super-resolution enhancement', 'https://github.com/idealo/image-super-resolution', 'art-creative-design', 'free', ARRAY['super-resolution', 'image-enhancement', 'open-source'], false, false, false),
  ('face-swap-online', 'Face Swap Online', 'Online face swapping tool using AI', 'https://faceswap.dev', 'art-creative-design', 'freemium', ARRAY['face-swap', 'online-tool', 'entertainment'], false, false, false),
  ('ai-background-remover', 'AI Background Remover', 'Automatic background removal for images', 'https://backgroundremover.app', 'art-creative-design', 'freemium', ARRAY['background-removal', 'automatic', 'batch-processing'], false, false, false),
  ('style-transfer-pytorch', 'Style Transfer PyTorch', 'Neural style transfer implementation', 'https://github.com/pytorch/examples/tree/master/fast_neural_style', 'art-creative-design', 'free', ARRAY['style-transfer', 'pytorch', 'neural-networks'], false, false, false),
  ('ai-sketch-converter', 'AI Sketch Converter', 'Convert photos to pencil sketches using AI', 'https://sketch.io', 'art-creative-design', 'freemium', ARRAY['sketch-conversion', 'pencil-drawing', 'artistic'], false, false, false),
  ('deepdream', 'DeepDream', 'Google''s neural network visualization tool', 'https://github.com/google/deepdream', 'art-creative-design', 'free', ARRAY['neural-visualization', 'google', 'psychedelic'], false, false, false),
  ('ai-anime-generator', 'AI Anime Generator', 'Generate anime-style characters and art', 'https://waifulabs.com', 'art-creative-design', 'free', ARRAY['anime-generation', 'character-creation', 'waifu'], false, false, false),
  ('photo-colorizer-ai', 'Photo Colorizer AI', 'Colorize black and white photos automatically', 'https://photocolorizer.com', 'art-creative-design', 'freemium', ARRAY['photo-colorization', 'automatic', 'historical'], false, false, false),
  ('ai-portrait-generator', 'AI Portrait Generator', 'Generate realistic portraits using AI', 'https://portraitai.app', 'art-creative-design', 'paid', ARRAY['portrait-generation', 'realistic', 'professional'], false, false, false),
  ('neural-filters-photoshop', 'Neural Filters (Photoshop)', 'AI-powered filters in Adobe Photoshop', 'https://helpx.adobe.com/photoshop/using/neural-filters.html', 'art-creative-design', 'paid', ARRAY['photoshop', 'neural-filters', 'professional'], false, false, false),
  ('ai-face-enhancer', 'AI Face Enhancer', 'Enhance and restore face details in photos', 'https://faceenhancer.ai', 'art-creative-design', 'freemium', ARRAY['face-enhancement', 'detail-restoration', 'portrait'], false, false, false),
  ('deepfakes-web', 'DeepFakes Web', 'Browser-based deepfake creation tool', 'https://deepfakesweb.com', 'art-creative-design', 'paid', ARRAY['deepfakes', 'browser-based', 'face-swap'], false, false, false),
  ('ai-art-shop', 'AI Art Shop', 'Marketplace for AI-generated art and tools', 'https://aiartshop.com', 'art-creative-design', 'freemium', ARRAY['marketplace', 'ai-art', 'commercial'], false, false, false),
  ('style-gan', 'StyleGAN', 'State-of-the-art generative adversarial network', 'https://github.com/NVlabs/stylegan', 'art-creative-design', 'free', ARRAY['gan', 'image-generation', 'nvidia'], false, false, false),
  ('ai-music-video', 'AI Music Video', 'Generate music videos using AI', 'https://aiva.ai/music-video', 'art-creative-design', 'paid', ARRAY['music-video', 'ai-generation', 'multimedia'], false, false, false),
  ('deepart-ai', 'DeepArt AI', 'Transform photos into famous art styles', 'https://deepart.ai', 'art-creative-design', 'freemium', ARRAY['art-styles', 'photo-transformation', 'famous-artists'], false, false, false),  ('ai-logo-maker', 'AI Logo Maker', 'Create professional logos using AI', 'https://logomaker.com/ai', 'art-creative-design', 'freemium', ARRAY['logo-design', 'branding', 'business'], false, false, false)
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'art-creative-design'
) 
WHERE id = 'art-creative-design';
