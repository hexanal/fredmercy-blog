---
title: Fatigue
description: keeps accumulating!
type: nerd, long-form
---

`7:50am:` In the midst of the tumult of life events, I allow myself *very short* moments to think about my job and how to be slightly better at it.

I've read a lot about efficiency, productivity, robustness, maintainability, etc. and I believe we should care about all of those. Yesterday I thought about robustness and how to build with it in mind; it occured to me that redundancy was one way of building something into a system to make it less prone to catastrophic failures.

I care deeply about what kind of experience a user is having when interacting with an interface. I think "code execution failures" (i.e. *bugs*) are obviously very detrimental to the experience of a user. Finding and fixing bugs is a task we find ourselves working on arduously almost every day.

So far in my career, I've never worked on a project where I had to write "tests", which is one way developers have found to make their codebase much more robust (i.e. by letting some code or program "catch" your mistakes before users discover them on their own!)

I think tests are cool; but it's still code, and they're only written to test specific bits of logic. I've been thinking about writing something like tests, but *inside* the codebase: the code would attempt to do something, then try to figure out if everything went smoothly.

To a user, one of the most important things is for the interface to respond appropriately to a given input. And a test will make sure that, given a specific input, the program returns the expected output.
But user input is much less specific: it's erratic, somehow unpredictable, and the output that the user expects... might not even be what the test was told to expect.

There are many *bugs* you won't catch with tests. I feel that constant *use* (i.e. using the program to achieve something) is what ultimately make the most pressing issues apparent. And I want to think about how to make it less frustrating for users to deal with bugs, as they try to use the program.
Possible research avenues:

1. allow multiple ways of achievings things (lets the user try something else to achieve the desired results)
1. allow feedback straight from the interface, to inform the developers that something isn't right (lets the developer fix real-life issues)
    - that can be done using *analytics* (or *tracking*!) but from my experience, all that Google Analytics nonsense is mainly used as a way to show that your program/interface is getting you more money! Am I wrong? I've never been told by any SEO/SEM expert to try and fix my code because of a discrepancy in the tracking data, which I think can and should be done regularly? Maybe it falls within the purview of a web developer? ughhhhh....
1. write the code in such a way that it loops back on itself, and analyses its own output according to some expectations, and eventually corrects obvious mistakes
    - or at least informs the user (via a popup or something?) that something might have gone wrong?
    - or informs the developer that this output might have caused an error (this probably means keeping a record of the user's inputs for troubleshooting purposes, which might constitute a breach of privacy)

`8:43am:` Whoa, I wrote a lot of stuff! And it's geeky stuff, written like I know what I'm talking about! But hey, people... you have to remember this blog is just a repository of random musings and can't be taken seriously (yet?)

However, I'll tell you this: about 10 years ago I finished (quit!) my communications studies because I wanted to get to the nitty-gritty of development, to be *doing* the stuff. These days, with the accumulated real-life experience, I want to dip my toes back into the research aspect of it. I wish to, maybe, change the way websites, interfaces, programs, games, etc. are made, by making them **friendlier**.

Let's see if I can!

