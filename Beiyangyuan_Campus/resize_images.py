from PIL import Image
import os

def resize_images():
    base_path = r"D:\Course\Information visualization\final_assignment\raw_picture"
    
    # Reference image
    ref_image_path = os.path.join(base_path, "Library.png")
    
    # Images to resize
    targets = ["Library1.png", "Library3.png"]
    
    try:
        # Get dimensions from reference image
        with Image.open(ref_image_path) as ref_img:
            target_size = ref_img.size
            print(f"Reference image size (Library.png): {target_size}")
            
        # Resize target images
        for target_name in targets:
            target_path = os.path.join(base_path, target_name)
            if not os.path.exists(target_path):
                print(f"Warning: {target_name} not found.")
                continue
                
            with Image.open(target_path) as img:
                # Resize using LANCZOS for high quality
                resized_img = img.resize(target_size, Image.Resampling.LANCZOS)
                resized_img.save(target_path)
                print(f"Successfully resized {target_name} to {target_size}")
                
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Check if Pillow is installed
    try:
        import PIL
        resize_images()
    except ImportError:
        print("Pillow library is not installed. Please run: pip install Pillow")
