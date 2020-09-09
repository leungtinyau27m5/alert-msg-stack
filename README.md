# alert-msg-stack

## Demo
![demo](demo/demo.gif | width = 100)

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

## Property and Customize

**popup.init()**
| Parameter | Required | Default | Options | Type | Description |
| --------- | -------- | ------- | ------- | ---- | ----------- |
| `defaultTimeout` | `false` | `3000` | `number` | `number` | the time out for message removing |
| `position` | `false` | `center` | `center`, `bottom`, `right`, `top`, `left` <br> `bottom right`, `bottom left` <br> `top left`, `top right` | `string` | the position of the message stack in screen |

<br/><br/><br/>


**popup.appendMsgInStack(options: Object)**
| Parameter | Required | Default | Options | Type | Description |
| --------- | -------- | ------- | ------- | ---- | ----------- |
| **`type`** | **`true`** | `info` | `error`, `success`, `warning`, `info` | `string` | the style of the message body |
| **`msg`** | **`true`** |  |  | `string` | the message body, could be html |
| `id` | `false` | ``` Math.random().toString(36).slice(5) + Date.now() ``` | any string | `string` | the id to identify message <br> you must provide `id` **if you want prevent duplicate call when the message is still on the screen** |
| `title` | `false` | the type of the message |  | `string` | the title of the message |
| `timout` | `false` | `defaultTimeout` |  | `number` | will override the `defaultTimeout` of this message item only |
| `from` | `false` | `home` |  | `string` | the source of the message called |
