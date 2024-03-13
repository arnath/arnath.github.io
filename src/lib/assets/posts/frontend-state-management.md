---
title: A backend dev's guide to frontend state management
date: 2024-03-10
published: false
---

I've been playing a lot with developing some mobile apps in Flutter recently.
They're mostly little hobby ideas that I think would be personally useful
although some I may release when I finish. An issue I've run into while doing
this is that **frontend state management is really complicated**. There are
similar-ish problems that arise while doing backend (usually around caching) but
state management has more moving pieces and more things that can go wrong. I've
figured out some concepts and patterns that work for me while writing my apps
and thought they might be generally useful to others. And so, here is a backend
dev's guide to frontend state management.

> Note: Everything I talk about here is my personal opinion, not the _only_ way
> to do these things.

## What is frontend state management?

The **state** of an app is basically a combination of all the values of all the
variables in the app at a given time. It's everything that's needed to display
the current UI that the app is showing. For example, for a social media app,
some of the state is things like info about the logged in user or the list of
posts in their feed.

**State management** is an umbrella term for the systems people use to manage their
application state: maintain the existing state of the application, update the UI when it
changes, and propagate changes to the backend. 

## Types of state

Something that wasn't clear to me until I got pretty far into working on my apps is that
there are different _types_ of state you'll encounter. I call these data state and UI state. 

**Data state** refers to things that represent major resources in your application. These are
things that you'll be saving to your backend because they are persistent user data. For example, 
if you were making a todo list app, the list of todos would be part of the data state. Generally, 
data state should be independent of the UI lifecycle of your app. 

**UI state** refers to things that the app needs to keep track of solely for display purposes.
These are things that affect the _current_ UI of the app but aren't necessarily useful to persist.
For example, suppose you have a todo list where you can select multiple items on a page. The set
of selected items would be part of the UI state.
