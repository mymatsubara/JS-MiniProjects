Description:
  There's a JavaScript in the html file. To make use of it, make sure to add the attribute "rainbow" to the element which the background
  will be animated.
  
E.g.:
  - div with an animated rainbow background:
    <div rainbow></div>
    
  - div with custom rainbow:
    <div rainbow="['green', 'red', 'orange', 'blue']; linear-gradient; to right left; 10; 1000/60"></div>
    format: <div rainbow="[css_colors];[gradient-effect];[direction];[speed];[refresh_rate]"></div>
  
  If you want you can change the default attibutes of the rainbow effect direct throught script variables (colors, gradTrype, step, interval)
  
  List of some possible colors:
  https://www.w3schools.com/cssref/css_colors.asp
  
  Some linar-gradient (used in the animation) directions:
  https://www.w3schools.com/css/css3_gradients.asp
