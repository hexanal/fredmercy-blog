---
title: Fulfillment, Creativity
description: Aliveness, aliveness
type: update
---

`9:23am:` Indeed another post! So, a myriad of thoughts run through my skull every day, and every day I try to piece them together, I try to figure out from where these thoughts originate, what causes me to think this or that?!

Over the next few days/weeks, my posts will surely contain more (awfully bad) philosophy, as I wrestle with... what I would call a *crisis of the mind*. It's cool; we're all in this together, I think. Nobody's out there feeling absolutely on top of things, right?

*Disclaimer*: you really **don't** have to read the rest of this entry if you don't want to read about web development related stuff!

---

`9:32am:` Ready for some nerdy description of how I manage this blog? Read on, then!

<code class="collapse">
<button type="button">Toggle the nerd talk 🤓</button>

Currently, I have to write this shit in a [markdown](https://en.wikipedia.org/wiki/Markdown) file and place it in a properly named folder (from where I infer the date and final URL), then I have to rebuild the whole website using [Gulp](https://gulpjs.com/) from the command line. It's cool, it works. But it's sort of clunky, and slow: that's my fault for having something that rebuilds the whole website every time and there's a very easy fix for that. I should probably look into it.

I have to run the [main website](https://fredmercy.ca)'s server on my laptop because the blog gets built (the actual html files!) into the *blog* folder.

After that, when I'm done writing and the post looks good, I use [git](https://git-scm.com/) to *push* those changes on [Github](https://github.com/). Then I [ssh](https://en.wikipedia.org/wiki/Ssh_(Secure_Shell)) into my server, [cd](https://en.wikipedia.org/wiki/Cd_(command)) into  the right folder, *pull* the changes, and then run a cool *npm run build* command to let the website be what it is.

If you've read through that and you're not too tech inclined and you're thinking “man, this sure looks like a lot of bullshit to go through in order to post blog updates!”... you're absolutely right!

However, I still like it. I like the *slowness* of it, the intentionality of it. It does the job. In the end I have exactly what is needed, even though it still requires some work (and obviously if you've been reading past entries you'll know that I have this burning desire to make this blog as good as possible, which to me means that it should do the absolute minimum to make the reading experience pleasant)

Pfew!

</code>

I had an idea yesterday regarding my blog and the way I will manage its updates. I thought of simply *editing HTML directly on the server*.

Crazy, eh? I know. Of course there would be some javascript-powered interaction going on, as always, but the structure would be entirely handled by old me, writing straight HTML, in one file, on the server. It reminds me of how I built one of my first websites! The crazy thing is, since it was just a handful of HTML files, I still have them backed-up somewhere: something I never thought of doing to my numerous Wordpress-powered websites! Those databases are lost in time, victim of the complexity by which they were put together.

Backing up that bitch would require a single [secure copy](https://en.wikipedia.org/wiki/Secure_copy_protocol) command.

Of course, this throws a big wrench into my plans of leveraging the AWESOME POWER of NextJS to build a *server-side rendered*, *statically-generated*, *progressively-enhanced*, *cybernetically-doped* website.

But frankly, I'm not trying to compete with Medium right here. I want to carve my own creative path through this tangled mess of Web 2.0 and rewrite the rules.

`3:26pm:` Man, I want to quit... this is becoming super irritating!

It's too big for me: I just wanted to write some dumb stuff, and play with CSS colors, and add some funky Javascript interactions. Now it seems I have to build a cathedral just to get that shit out there. No thanks, I'm done. Sorry. I'm probably gonna use Wordpress in the end, haha!
