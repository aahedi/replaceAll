# replaceAll.js
replaceAll library js by [Aahedi](https://github.com/aahedi/)
## Usage
Add ``` <script src="https://aahedi.github.io/replaceAll/replaceAll.js"></script> ```

then call function
```
replaceAll(string, find_string, replace_string, options)
```
## example
```
replaceAll(
'123hedi456 abchediefg 123hedi abchedi hedi456 hediefg 123Hedi456',
'hedi',
'****', 
{prefix_is:'123',
suffix_is:'456',
prefix_not:'123',
suffix_not:'456',
insensitive:false})
```

## result

```
123hedi456 abc****efg 123hedi abc**** hedi456 ****efg 123Hedi456
```

## License

MIT
