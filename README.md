# 🦄 Unicorn

A [Visual Studio Code][code] extension that adds a status bar entry
showing Unicode data for selected characters.

## Demo

Watch the status bar entry in the bottom right of the window
update with the Unicode name and code point of the current character
as the cursor moves through the document.

![Unicorn Demo](https://user-images.githubusercontent.com/7659/97903637-31523080-1cf4-11eb-81b7-7bca53c348f3.gif)

Clicking on the status bar entry opens a panel with additional information. 

![Unicorn Character Information Panel](https://user-images.githubusercontent.com/7659/97903679-44fd9700-1cf4-11eb-88e5-ce8e24e4f702.png)

> This extension is currently in active development.
> See the [roadmap](#roadmap) for a list of current and planned features.

## Installation

### Install from Visual Studio Marketplace

> Coming soon!

### Build and Install from Source

#### Requirements

- [TypeScript][ts] 4.0+
- [Visual Studio Code][code] 1.32+

#### Instructions

```terminal
$ npm install
$ npm run package
$ code --install-extension ./unicorn-0.0.1.vsix
```

## Roadmap

- [x] Initial support for [BMP][bmp] characters
- [ ] Support for viewing Unicode information of multiple characters
- [ ] UTF-8 code units in character information panel
- [ ] Complete [UCD][ucd] data in character information panel
- [ ] Redesigned character information panel
- [ ] Support for [CJK Unified Ideographs][cjk], emoji, and other characters
- [ ] Automated [testing]
- [ ] Submission to [Visual Studio Marketplace][marketplace]
- [ ] [Continuous Integration][ci] pipeline with [Github Actions][actions]

## License

MIT

[code]: https://code.visualstudio.com "Visual Studio Code"
[ts]: https://www.typescriptlang.org "TypeScript Language"
[bmp]: https://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane "Basic Multilingual Plane"
[ucd]: https://unicode.org/ucd/
[cjk]: https://en.wikipedia.org/wiki/CJK_Unified_Ideographs "CJK Unified Ideographs"
[testing]: https://code.visualstudio.com/api/working-with-extensions/testing-extension
[marketplace]: https://marketplace.visualstudio.com
[ci]: https://code.visualstudio.com/api/working-with-extensions/continuous-integration
[actions]: https://github.com/features/actions
