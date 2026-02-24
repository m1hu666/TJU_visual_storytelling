from PIL import Image
from pathlib import Path
import argparse
import sys

ALLOWED_EXTS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}


def parse_args():
    p = argparse.ArgumentParser(
        description='Resize all images in a folder to match the size of a target image (yanjing.png).')
    default_dir = Path(__file__).resolve().parent / 'college'
    default_target = Path(r"D:/Course/Information visualization/final_project/departmental_adjustment/college/yanjing.png")
    p.add_argument('--dir', '-d', type=Path, default=default_dir,
                   help=f"Source directory containing images (default: {default_dir})")
    p.add_argument('--target', '-t', type=Path, default=default_target,
                   help=f"Target image to copy size from (default: {default_target})")
    p.add_argument('--inplace', action='store_true',
                   help='If set, overwrite original images. Otherwise save to a subfolder `resized_by_yanjing`.')
    p.add_argument('--recursive', action='store_true', help='Recursively process subfolders')
    return p.parse_args()


def is_image(p: Path):
    return p.is_file() and p.suffix.lower() in ALLOWED_EXTS


def main():
    args = parse_args()
    src_dir: Path = args.dir
    target_path: Path = args.target

    if not src_dir.exists() or not src_dir.is_dir():
        print(f"Source directory not found: {src_dir}")
        sys.exit(1)

    if not target_path.exists() or not target_path.is_file():
        print(f"Target image not found: {target_path}")
        sys.exit(1)

    try:
        with Image.open(target_path) as timg:
            target_size = timg.size  # (width, height)
    except Exception as e:
        print(f"Cannot open target image: {e}")
        sys.exit(1)

    if args.inplace:
        out_dir = None
    else:
        out_dir = src_dir / 'resized_by_yanjing'
        out_dir.mkdir(parents=True, exist_ok=True)

    files_processed = 0
    files_skipped = 0
    errors = 0

    iterator = src_dir.rglob('*') if args.recursive else src_dir.iterdir()

    for p in iterator:
        # skip the target image itself
        try:
            if p.resolve() == target_path.resolve():
                files_skipped += 1
                continue
        except Exception:
            pass

        if not is_image(p):
            continue

        try:
            with Image.open(p) as im:
                # preserve mode where possible (but ensure convertable)
                mode = im.mode
                # perform resize to exact target_size
                im_resized = im.resize(target_size, Image.LANCZOS)

                save_path = p if args.inplace else (out_dir / p.name)

                # For formats like JPEG, preserve quality reasonably
                save_kwargs = {}
                fmt = im.format
                if fmt is None:
                    fmt = p.suffix.replace('.', '').upper()

                if fmt.upper() == 'JPEG':
                    save_kwargs['quality'] = 95
                    # JPEG doesn't support alpha; convert if necessary
                    if im_resized.mode in ('RGBA', 'LA'):
                        im_resized = im_resized.convert('RGB')

                # For PNG keep transparency
                im_resized.save(save_path, format=fmt, **save_kwargs)
                files_processed += 1
        except Exception as e:
            print(f"Error processing {p}: {e}")
            errors += 1

    print('\nSummary:')
    print(f'  Source dir: {src_dir}')
    print(f'  Target image: {target_path} -> size={target_size}')
    print(f'  In-place: {args.inplace}')
    if out_dir:
        print(f'  Output dir: {out_dir}')
    print(f'  Files resized: {files_processed}')
    print(f'  Files skipped (including target): {files_skipped}')
    print(f'  Errors: {errors}')


if __name__ == '__main__':
    main()
