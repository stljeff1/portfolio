**This was abandoned when I discovered I would need to mess with file permissions on the server. I never researched the best and easy way to do that.**

Recently, I had the opportunity to build out a company's website using Wordpress. With any website, what is most interesting to me is how the company shows their employees / staff on their website. Do they take themselves seriously? Do they enjoy their work? How much do they promote individuality? Do they show any individuals? You can tell a lot from how a company presents their employees on their website.

Anyway, in this particular client, they wanted to show their employees in a grid, and have cool mouseover effects with each individual's photo. I solved this problem by defining background images for the default and hover state of each grid item. But rather spit out a bunch of inline CSS, which is common practice on a Wordpress site, I challenged myself to find a way to place this CSS in an external stylesheet.

The Setup

The client was using Advanced Custom Fields extensively throughout the site. The User section was no different.

Each employee of the company was given a user account on the company's website. Each user account was configured to have a Job Title, a default image, hover image, and other data.

The Challenge 

How do I generate the CSS to display the default and hover images, including the media queries needed to show different backgrounds at different resolutions?

Furthermore, there is more than one template that needs thiS CSS. Do I generate this CSS everytime it is needed and stuff it on the page inline? That seems a lot of wasted processing power and page weight, does it not?

Generate CSS!

I decided to find a way to generate an external stylesheet that can be quickly loaded when needed. I figured out a way how to loop through all users of the website, grab the URLs of the headshot images, generate the necessary CSS needed and save it to a file in the theme's directory. In addition, I wrote a function to maintain the generated CSS, including updating and existing styles already in the stylesheet.

You can see the resulting code on my github account.

Overall Takeaways

