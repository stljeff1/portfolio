**This was abandoned when I discovered I would need to mess with file permissions on the server. I never researched the best and easy way to do that.**


I wanted to find a way to generate an external stylesheet that can be quickly loaded when needed. I figured out a way how to loop through all users of the website, grab the URLs of the headshot images, generate the necessary CSS needed and save it to a file in the theme's directory. In addition, I wrote a function to maintain the generated CSS, including updating and existing styles already in the stylesheet.
