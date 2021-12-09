# NhacCuaTui API Full Bundle

### Import the script

```html
<script src="https://cdn.jsdelivr.net/gh/napthedev/nhaccuatui-api-full@bundle/build/bundle.js"></script>
```

## This will add `NhacCuaTui` object globally.

### For the documentation, check the master branch

### Usage example

```javascript
NhacCuaTui.getHome().then((data) => console.log(data));

// or

(async () => {
  const data = await NhacCuaTui.getHome();
  console.log(data);
})();
```
