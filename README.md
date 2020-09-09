# alert-msg-stack

## Getting Started

**important elements**
- popup.js
- popup.css
- jquery

## usage
```html
<body>
<!-- index -->
<!--<link rel="stylesheet" href="/popup/popup.css" />-->
<!--no need to import css if you put both popup.js and popup.css into same folder-->
<script src="/popup/popup.js"></script>
</body>
```

```javascript
//initialize popup module
const defaultTimout = 3000 //Number, the default timeout to remove the message in the stack and dom element
const position = 'bottom right'//String, the position of the message stack in the screen
popup.init(defaulTimeout, position)
```

```javascript
const options = {
  type: 'error', //the type of the message
  id: 'random-string', //the id of the message
  msg: '<span class="red">Hello!</span>', //the message body
  title: 'this is title', //the message title
  timeout: 5000, //the timeout for fade out and remove the message, it will override the default timeout
  from: 'home page' //the source of the message from 
}
popup.appendMsgInStack(options)
```
