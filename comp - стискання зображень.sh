for d in */;
do
    echo "$d"
    ( cd "$d/media/images/" && npx @squoosh/cli --quant '{\"enabled\":true,\"zx\":0,\"maxNumColors\":256,\"dither\":1}' --oxipng '{\"level\":2,\"interlace\":false}' ./*.png )
done

# for d in */ ; do
#     echo "$d"
# done