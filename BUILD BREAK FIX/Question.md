how do you use multiple colours in linear gradient 
body {
  height: 100vh; /* full viewport height */
  margin: 0;     /* remove default browser margin */
  background: linear-gradient(to left, red, lime, orange, purple);
}

Each color in a linear-gradient() can have an optional stop position, like:

red 0%, yellow 50%, blue 100%


These are color stops — they define where each color is “anchored” along the gradient line.

The first stop (0%) marks the beginning.

The next stop defines where the previous color ends and blending begins.

The last stop defines the final point (no blending after it).

If you don’t give percentages, the browser evenly spaces them out automatically.

🧮 3. How the % Works

% = how far along the gradient line the color should appear:

0% → start of the gradient

100% → end of the gradient

anything in between (like 25%, 50%, 80%) tells the browser where along that line to reach that color

So:

linear-gradient(to right, red 0%, yellow 50%, blue 100%)


means:

start red

gradually fade to yellow halfway (50%)

gradually fade to blue by the end (100%)

🧱 4. Hard Stops (no blending)

If two color stops share the same position, there’s no room to blend — it jumps instantly:

linear-gradient(to right, red 0%, red 50%, blue 50%, blue 100%);


→ solid red until 50%, then instant blue from 50% onward.
That’s how you make stripes or sharp edges.

🧠 5. If You Don’t Specify %

The browser just divides the space evenly.

linear-gradient(to right, red, yellow, blue);


→ 3 colors = automatically at 0%, 50%, 100%.
It behaves as if you’d written red 0%, yellow 50%, blue 100%.

⚡ Summary in One Line:

Percentages tell the browser where each color sits,
stops are those anchor points,
and when two stops share the same spot → no blend, just a sharp cut.
-------------------
explain teh box shadow , shorthand code
[inset] offset-x offset-y blur-radius spread-radius color
inset → shadow goes inside the box (remove it for outside shadow)

offset-x → horizontal movement of the shadow

0px = straight, no left/right shift

positive = shift right, negative = shift left

offset-y → vertical movement

positive = shift down, negative = shift up

blur-radius → how soft the shadow is

bigger number = blurrier/fuzzier shadow

spread-radius → optional, makes shadow bigger or smaller than the box

color → shadow color
-------------------------------
can you use two position or dispaly in css
No — CSS properties take only one value at a time.

For example:

.title {
  position: relative;   /* correct */
  position: absolute;   /* THIS WOULD OVERRIDE THE previous one */
}


The second position simply overwrites the first one.

Same with display: you can’t do display: block; display: flex; in the same rule — the last one wins.
--------------------
what is the before pseudo element in css


::before pseudo-element
.title::before {
  content: "";}
::before creates a new invisible element before the content of .title.

content: "" is mandatory — without it, the pseudo-element won’t appear.

We’re using this element to draw the glare.
-------------------
what is the css code to add glare to an eleemnt
.title::before {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  animation: glare 2.5s infinite;
}

@keyframes glare {
  0% { left: -75%; }
  100% { left: 125%; }
}
---------------------
what is the inline blovk display ?
display: inline-block;

This makes each <span> act like:

Inline (sits next to other text, not on a new line), but

Also a block (you can move it around, resize it, and apply transforms like translate, rotate, etc.).

Without inline-block, you can’t move the span properly up and down with transform, because normal text (inline) can’t be positioned or animated that way.

👉 In short:
inline-block lets each word or letter move independently while still staying on the same line.
------------------------
what is the forwards in animation
This tells the browser:

“When the animation ends, keep the final look instead of jumping back to the start.”

So:

animation-fill-mode: forwards; → stays in the end position (e.g. visible and in place)

Without it → goes back to its start (e.g. invisible and up above)
--------------------
how do you make a cool drop down with <span > words in <div>
.title span {
  display: inline-block; /* important for vertical movement */
  transform: translateY(-100px); /* start above */
  opacity: 0;               /* start invisible */
  animation: dropdown 0.8s forwards; /* forwards keeps final state */
}

/* stagger each word */
.title .guess { animation-delay: 0s; }
.title .that  { animation-delay: 0.3s; }
.title .number{ animation-delay: 0.6s; }

@keyframes dropdown {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
---------------------
what is the (0) in transform properties
In CSS transform properties, the value 0 means “no change from the element’s original state.”

That is:

For translate(0) → no movement

For rotate(0deg) → no rotation

For skew(0deg) → no tilt

And for scale(1) → no size change (since 1 = 100%)

✅ In short: 0 resets the transform — it keeps the element in its natural, untouched position or orientation.
----------------------------
what happens if you use an animation without relative position

If you use an animation on an element with position: absolute but its parent doesn’t have position: relative, the element will be positioned relative to the whole page (viewport) instead of staying inside the parent.

In other words:

The animated element will ignore the container.

Any clipping like overflow: hidden on the parent won’t work, because the element isn’t “inside” the container in terms of positioning.

Visually, things like your glare or moving pseudo-elements will spill out across the page.

✅ Bottom line:
position: relative on the parent = tells absolute children “stay in my box”. Without it, the animation can go wild.
infinite → repetition

Makes the animation loop forever.

Without this, it would just run once and stop.
alternate → direction toggle

Normally, an animation always runs from 0% → 100% and then jumps back.

alternate makes it go 0% → 100%, then 100% → 0%, creating a back-and-forth effect.

Perfect for sliding text left and right smoothly.
ease-in-out → timing function

Controls how fast the animation moves at different points.

ease-in-out → starts slow, speeds up in the middle, ends slow.

Gives a natural, smooth feel instead of a constant robotic speed.
Smooth back-and-forth
animation: slideLR 4s infinite alternate ease-in-out;


Bounces right → left → right smoothly forever.

2️⃣ Constant speed sliding
animation: slideLR 5s infinite linear;


Slides right → left at constant speed, snaps back, repeats forever.

3️⃣ Slide once and stay
animation: slideLR 3s forwards ease-out;


Slides from right → left once and stays at the end