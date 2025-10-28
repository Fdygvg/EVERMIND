--------------
what to do when git add remote origin isnt working 
you need to first run 
git init
git remote add origin https://github.com/Fdygvg/CLICK-COUNTER.git
git branch -M main
git push -u origin main
---------------
what is font awesome and how to use 
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css
-------------------
how do you grab everything when editing with css
use the **
-------------
what is box sizing in css
Box sizing is a CSS property that controls how the width and height of an element are measured.

With box-sizing: border-box, the size you set for an element includes its border and padding.

This makes layouts and sizes much easier to manage and keeps boxes the size you expect, no matter how much padding or border you add.
----------------------
explain vh , and how can you tell which axis is which
Axis Explanation:
In flexbox:

Main axis is the direction of flex-direction (default is horizontal/row)

Cross axis is perpendicular to main axis

Properties:
justify-content aligns items along the main axis

align-items aligns items along the cross axis

Example:

css
.container {
  display: flex;
  flex-direction: row; /* main axis is horizontal */
  justify-content: center;   /* aligns left/right (main axis) */
  align-items: center;       /* aligns up/down (cross axis) */
}
If you use flex-direction: column, then:

Main axis is vertical

Cross axis is horizontal

Summary:

height: 300vh = 3x tall, lots of vertical scroll

justify-content = main axis

align-items = cross axis

Which is which depends on your flex-direction!
------------------------
what is the shorthand for adding background images 
.box {
  background: url('image.jpg') center/cover no-repeat #eee;
}

nb: dont add the image , else teh shorthand gets ignored
------------------
how to add shadow with css
box-shadow: offset-x offset-y blur-radius color;
-----------------
how do you add space between lines in css 
It sets the height of each line in a block of text.

Bigger line-height = more space between lines (text looks more spread out).

Smaller line-height = less space (lines are closer together).

You can use:

Number: line-height: 1.5; (1.5 times the font size)

Pixels: line-height: 24px;

Percent: line-height: 150%;
---------------------
text-transform is a CSS property that lets you change the capitalization of text.

What does it do?
Changes text to uppercase, lowercase, or capitalize (first letter of each word).

Examples:

css
p {
  text-transform: uppercase;   /* turns everything into CAPS */
}

h2 {
  text-transform: lowercase;   /* turns all letters to small letters */
}

.title {
  text-transform: capitalize;  /* first letter of each word is a capital */
}
-------------------
what is the  Shortcut to delete an entire line in VS Code:

Windows/Linux: Ctrl + Shift + K
-------------------
padding shorthand
Proper usage:
css
padding: 10px 10px;
This sets:

10px padding on the top and bottom

10px padding on the left and right
-----------------
what do you do when updating two objects at one 
use objects so you can put multiple
---------------
what is the difference Single Object vs Array of Objects
A single JSON object uses curly braces {}:

json
{
  "quote": "Believe you can and you're halfway there.",
  "person": "Theodore Roosevelt"
}
An array of JSON objects uses square brackets [] to hold multiple objects:

json
[
  {
    "quote": "First quote",
    "person": "First person"
  },
  {
    "quote": "Second quote",
    "person": "Second person"
  }
]
-------------------
what is anither way to use the random 
insted of counting elements or properties in arr or obj to use max and min in math.random , use element.lenght
my max and min , is if you want within a range 
----------------------
when in detached head state how do i push 
You must first create a branch from your detached HEAD:
Create a new branch:

bash
git switch -c my-feature-branch
(or git checkout -b my-feature-branch in older git)

Now push your changes:

bash
git push origin my-feature-branch
-----------------
what are html entities, list some of them
Entity	Character	Description
&times;	×	Multiplication sign
&amp;	&	Ampersand
&lt;	<	Less-than
&gt;	>	Greater-than
&copy;	©	Copyright
&trade;	™	Trademark
&euro;	€	Euro symbol
&quot;	"	Double quote
&apos;	'	Single quote
&cent;	¢	Cent sign
&plusmn;	±	Plus/minus
-------------------------------------
what is the transition used for 
The transition property in CSS makes changes to an element’s style happen smoothly, over a set period of time, instead of instantly.

It animates property changes (like color, size, position) when they happen (on hover, click, or by JS).

transition: .5s; means: “If anything about this element changes, animate it over half a second (0.5s).”

Nothing animates until a property actually changes!
-----------------------------
do you add th . & # when using pseudo calsses?
YES
------------------
how do you center an absolutely (or fixed) positioned element?
transform: translate(-50%, -50%)
its best especially when you’ve also used top: 50%; left: 50%;.
Together, this combo places the center point of the element exactly at the center of its parent/container/page.
Without transform: translate(-50%, -50%), your box will not be centered—just offset so the top-left corner is at the percentages you set.

So 50%/50% + transform is for perfect centering; other values just place the box by its top-left corner.
--------------------------
what attribute to make text or divs look like its appearing 
opacity
opacity is a CSS property that makes things see-through from 0 (invisible) to 1 (solid).

Any value between 0 and 1 works for partial transparency.
-----------------------
how do you make a seethrough for modals and navbars 
rgba(0,0,0,.2) means:
The background is colored black.

.2 means only 20% black, and 80% see-through, like smoky glass.

So, you can see what’s behind it, but it looks a little dim.
-----------------------
what does the after:: pseusdoclass do
.question::after uses a CSS pseudo-element (::after) to add extra stuff after the content in every .question element (not in the HTML, just visually).

content: '+';: puts a plus sign (+) after each question.

position: absolute;: positions the plus sign independently from the question’s text—lets you move it anywhere inside the .question’s container.
-------------------
how do you hide overflowing content in css
example
  width: 100%;
  height: 0px;
  overflow: hidden;
visible (default): Content spills out freely

hidden: Extra is clipped, not shown

scroll: Adds scrollbars if content overflows

auto: Adds scrollbars only if needed
------------------------
Q:
What does the toggle.active do 

A:
It adds or removes the "active" class on the section you clicked.

If "active" is added: That section opens and shows the answer.

If "active" is removed: That section closes and hides the answer.

Why is toggle useful?
toggle is like turning a light switch on and off—it flips the “active” status every time you click, so things can open and close over and over.
---------------------------------
how to make input to only display text 
ans.add read only 