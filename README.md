## Mailmaker

A toolset for create your awesome emails.



## Installation

Clone the repository in local and install the dependencies, then run gulp.

**git:**
```
$ git clone https://github.com/klaufel/mailmaker.git
```

**npm:**
```
$ cd mailmaker
$ npm install
$ gulp
```

**Configuring emails**
```
- var config_title = 'Title of email'
- var config_legal = true
```


## Distribution

```
$ cd mailmaker
$ gulp
$ gulp dist
```

Will take our style sheet and compile it to make a file containing the styles presented in style attribute in "/dist" folder.
