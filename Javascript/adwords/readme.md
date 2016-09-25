#### Adwords Conversion Example
***

###Date: May, 2014

###Purpose

I was asked to figure out how track Adwords lead conversions for an enterprise customer, which was something out of the ordinary given the unique Content Management System (CMS) in use. All forms were created by the system, so the only way to solve this problem was to implement a client-side solution (jQuery).

### Solution

I essentially created two scripts. First, I created a script that parsed the URL. If the  script detected a gclid URL variable, which appears if a user arrives to the site via an Adwords campaign, the script saved that value as a cookie. With the gclid value saved as a cookie, I used jQuery to attach the gclid value to the lead submission, thus enabling the client to track lead conversions.


[Return to Javascript samples](https://github.com/stljeff1/portfolio/Javascript/)