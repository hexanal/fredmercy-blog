---
title: Minimaler and minimaler...
description: if I don't need it, I chuck it it in the bin
type: post
tagged: web development, site update
---

> _⚠️ tl;dr:_ this post is about web development and goes into nerdy details; skip it if you don't care about that stuff!

~~

`2:38pm:` This morning I thought I'd try something kind of random/crazy/dumb: how about I don't use any bundler/transpiler and I just try to match current browser support when writing my scripts, while at the same time leveraging [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)?

So I did it and it... kind of works! Naturally, I had to convert a few things to _modules_, and get rid of some dependencies. I'm proud to say the frontend doesn't _depend_ on any external library anymore, as I have been <dfn title="i.e. keeping a local copy of an external library">vendoring</dfn> the last remaining ones, which ended up only being [lodash.debounce](https://www.npmjs.com/package/lodash.debounce). **pfew!** 😅

I'm not 100% sure what it means in terms of performance, UX, developer experience and whatnot, but this is my little experiment.

The server is still running on NodeJS using Express, and I still use my weird website generator I call “Zorg”, but the next experiments will consist in getting rid of as many dependencies as possible in those domains as well.

I'm not fond of Docker, but it might come in handy if I want to make that website super portable? I just wish I could install that sucker on any machine and have it be live in a matter of _seconds_.

As for Zorg, its dependencies aren't crazy and I will need them; it's out of the question to write my own filesystem watcher ([chokidar](https://www.npmjs.com/package/chokidar)), or my own glob implementation ([glob](https://www.npmjs.com/package/glob)), etc. and I haven't looked into how easy/safe it would be to vendor those in as well.

Just 21 direct dependencies so far, and most of them are linked to the Express server. I only use the server for two API endpoints related to the comments, and I'm thinking of ditching that too, at some point. I have other ideas for “comments”... ain't nobody commenting on those rambling posts anyhow!

Man, it feels good to go **minimal**!
