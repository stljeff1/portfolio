## Adding Items from "Master" list to view model with Knockout JS
***

### Date: April, 2017

### Purpose

This knockout component will populate a select box with items from a remote data source, and selected items to a 'user' object.

#### HTML:
``` html
<add-to-list params="list: $root.ListOfItems, optionsText: 'name', submit: addItem, disable: (selectedUser().List().length >= 5), limitMsg: 'Limit reached.'">
</add-to-list>

```

See my [blog post](http://blog.jeffwilkerson.net/adding-items-to-list-knockoutjs/) and [codepen](http://codepen.io/stljeff1/pen/dvBvbj) for more on this example.


[Return to Javascript samples](https://github.com/stljeff1/portfolio/tree/master/Javascript/)