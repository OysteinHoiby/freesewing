---
title: Setting up the FreeSewing development environment
order: 40
---

FreeSewing provides a development environment to help you design and develop patterns.

There are two ways to run this development environment:

- [**Monorepo development**](#monorepo-development): Use this if you intend to contribute your work to FreeSewing
- [**Stand-alone development**](#stand-alone-development): Use this if you want to do your own thing, and not contribute to FreeSewing

## Monorepo development

<Note compact>This is the recommended way for (aspiring) FreeSewing contributors</Note>

### TL;DR

```bash
git clone https://github.com/freesewing/freesewing
cd freesewing
yarn kickstart
```

<Tip>
Even better: [clone your own fork](https://github.com/freesewing/freesewing/fork)

```bash
git clone https://github.com/your-username/freesewing
cd freesewing
yarn kickstart
```

</Tip>

### Step by step

<Comment by="joost">
These docs assume you have git installed. 
But if you're running macOS, you have git, right?
</Comment>

#### Install yarn

Our repository uses yarn workspaces. So you'll need yarn to work with it.

To install it run:

```bash
npm install yarn --global
```

#### Fork our repository

You'll want to fork our repository. This way you have your own copy where you can make
all the changes you want. To do so, visit https://github.com/freesewing/freesewing/fork

#### Clone the forked repository

Now that you have your very own fork, time to clone it locally.

```bash
git clone <url to your fork>
```

Make sure to use the URL to your own fork, typically `https://github.com/your-username/freesewing` but
obviously with your real username rather than `your-username`.

#### Install dependencies

Enter the directory that was created, and run the `yarn kickstart` command:

```bash
cd freesewing
yarn kickstart
```

Now you're ready to [start the development environment](/tutorials/getting-started-mac/dev-start).

## Stand-alone development

With NodeJS installed, all you need to do to setup the stand-along development environment is run this command:

```bash
npx @freesewing/new-design
```

After you've answered [some questions](#questions), it will take a while to set everything up.
When it's done, you will have a new folder with the development environent inside.

Now you're ready to [start the development environment](/tutorials/getting-started-mac/dev-start).

<Tip compact>The folder will have the name you chose above</Tip>

<Note>
### Questions

#### What template to use

Use `From scratch` unless you want to start from our of our blocks:

- Use `Extend Brian` to start from [Brian](https://freesewing.org/designs/brian)
- Use `Extend Bent` to start from [Bent](https://freesewing.org/designs/bent)
- Use `Extend Bella` to start from [Bella](https://freesewing.org/designs/bella)
- Use `Extend Breanna` to start from [Breanna](https://freesewing.org/designs/breanna)
- Use `Extend Titan` to start from [Titan](https://freesewing.org/designs/titan)

#### What name to use

This will become the name of your design. Stick to \[a-z] here to avoid problems.

If you're not certain what to pick, just mash some keys, it doesn't matter.

#### What package manager to use

Chose `npm` if you don't have `yarn` are when you're not sure what the heck `yarn` is.

</Note>
