# Description/Intro (you can skim this part)
### tl;dr
This project seeks to tailor the educational experience of its users based on their needs, interests, and goals. Admittedly, it's a bit ambitious, but there will be phases of development that will make things a little bit easier to manage. Content will initially be pulled from Wikipedia or linked from other sources (Paul's Online Notes, Khan Academy, etc). That content, by demand will be restructured and formatted to extend the accessibility of the information covered. At the very least, initially we will be a place to view and collect resources towards a goal.

## Objective
### tl;dr-
The goal is to make education more accessible.

Everyone has their own needs, interests, and struggles, and it doesn't make sense to present information as if all of these are going to be the same for all people. After finding the basic building blocks that go into what's being taught, we reformat and reassemble them to create an experience that accomodates for what makes someone unique.

## Implementation
### tl;dr-
Starting with content pulled from resources like Wikipedia, or linked to resources like KhanAcademy, we provide learners with a way to view information that would be helpful for their classes. From there, we have a system to break these down into components and change the presentation style of each component. Because there is a decent amount of granular customization, machine learning will be implemented to make some of the decisions for the users ahead of time.

### Structure
Following the design of Wikipedia, each Concept will get a Page representation. Information on the Page will broken down into Sections, which are often implemented in the form of paragraphs.

Sections are meant to be standalone containers of statements that can be made about a Concept. Each Section or group of Sections has the potential to be represented differently based on which presentation style would be most useful to the learner. For example, if a learner would be more interested in viewing a cluster of Sections as a video instead of text, and that presentation style is available, they would be allowed to do so. In addition, learners could be able to change the depth of knowledge required to understand something. This would allow them to choose which of two inversely related attributes they would rather experience - longer content length, or more required prerequisite knowledge.

Seeing as the scope of this project is rather large, content will be initially pulled from Wikipedia, and then coerced into a format similar to what would be had on the site. Other resources could also be linked and reformatted as well. As they wish, users will be allowed to extend these articles/videos with their own content (summaries, explanations, pictures, etc. ). Content will also be created by the team I have at UIUC based on demand from learners in the beta courses.

Because we grant users a decent amount of control over what they're viewing and how they're viewing it, we want to make sure they aren't overwhelmed by the amount of options. Through the "User Profile", we collect some demographic-based information, which will include things like their age, school, gender, ability status (dyslexia, ADHD), and so on. We will also implement "Tracks", which are collections of related goals that can be used to tell us what they want to do and why. Basic example tracks would be "To (do well in) (ECE 120) (by the end of the semester)" or "To (learn about) (machine learning) (well enough to communicate with my coworkers) (in 5 weeks)". The idea of Tracks will start off basic, but increase in complexity once the site is more mature.

We keep track of things that can be known through the use of StatementPlaceholders. These are meant to describe one chunk of knowledge, being the most basic component of what there is to know on the site. An example could be "the definition of a Mole" or "how to juggle three balls". StatementPlaceholders are answered by Statements that are made in Sections.

In order to allow some level of flexibility and accomodate for inevitable disagreements that can arise, some Entities and relationships between Entities will only exist in the context of a "Universe", which is essentially a representation of a unified school of thought. In cases where this doesn't really matter, this can be left blank.

# Datatypes (required attributes have an asterisk)
## Entity
* *type**
*enum value*
(e.g. Page, Section, Concept, Track, etc.)

## Concept
* Tags
*Array <string>*
(desc: a list of tags to describe a concept)
* Parent Concepts
*Array <Concept>*
(desc: the Concepts that this Concept is a subset of)

## Universe
(desc: meant to isolate where things are considered valid)

## Pages
(desc: a physical representation of a Concept)
* Dimensions*
*Array <Dimension>*
(desc: represents a collection of Sections that describe the page)
* Universe*
Universe
(desc: the Universe in which the things covered by this page are valid)

## Dimension
* Purpose
*enum value*
(desc: the reason that this Dimension exists on the Page)
* Sections
*Array <Section>*
(desc: represents information about the dimension)

## Section
* Statements
*Array <Statement>*
(desc: the things that one can learn from a Section)
* Pivots
*Array <Section:Universe>*
(desc: Sections that have the same content as this one, but are presented differently. Usually replaces one Section with another one.)
* Expansions
*Array <Section:Universe>*
(desc: Sections that represent the same content as this one, but are broken down more. Usually replaces one Section with multiple.)
* Summaries
*Array <Section:Universe>*
(desc: The opposite of Expansions. Provide the same content, but more terse. Requires more prerequisite knowledge)
* Prerequisite knowledge
*Array <StatementPlaceholder>*
(desc: The things that someone has to know in order to understand something)

## StatementPlaceholder
(desc: Represents something that can be answered with a fact or opinion)
* Placeholder*
*string*
(desc: whatever can be answered)
(e.g. how to juggle)
(e.g. the square root of negative 1)
(e.g. the current president of the US)
* Synonyms
*Array <StatementPlaceholders>*
(desc: statements that have been judged as being synonymous with this one)

## Statement
(desc: A fact or opinion that can answer a StatementPlaceholder)
* Statement*
*string*
(e.g. the square root of negative 1 is i)
(e.g. Donald Trump is the current president of the US)
(e.g. pie is the best dessert)
(e.g. a video about how to juggle)
* Answered Placeholders
*Array <StatementPlaceholder>*
(desc: The StatementPlaceholders that this Statement answers)
* Universe
*Array <Universe>*
(desc: The Universes in which this statement is valid)

## Track
(desc: A representation of a SMART goal)
* Action*
*enum value*
(desc: Basically what they want to do. Specifying this allows us to guess at what it will mean to be successful)
(e.g. do well in)
(e.g. memorize)
(e.g. know how to)
* Operand*
*string*
(e.g. ECE 120)
(e.g. human bones)
(e.g. juggle)
* Duration
*timespan*
(e.g. in 5 months)
* Requirements*
*Array<Entity>*
(desc: usually Tracks, Statement Placeholders, or Statements, these are the Entities that a User should interact with/digest in order to complete a Track)


* Parent Tracks
*Array <Track>*
(desc: the Tracks that this is a subset of)
(e.g. Math 				-> Calculus)
(e.g. Calculus 			-> Calc III)
(e.g. Biology,Chemistry -> Biochem 287)

* Completed?
*boolean*
(desc: whether they've completed the track)
* Expired?
*boolean*
(desc: whether the track has been completed in the timespan specified)
* Tags
*Array<string>*
(desc: a list of tags that go along with the track)




# Machine Learning
## User Inputs
* Age
*float*
* Gender
*string*
* Grade
*integer?*
* Ability Status
*Array <enum value>*
* Interests
*Array <string? enum value?>*
* Major(s)
*Array <string? enum value?>*
* School(s)
*Array <string?>*
* Workplace(s)
*Array <string?>*
* Country
*enum value*
* Known languages
*Array <enum value>*
* Ethnicity
*Array <enum value>*
* Home Universe
*Universe*
(desc: the User's default Universe)

* Tracks
*Array <Track>*
(desc: the tracks that this user is going through/already completed)
(note: these could describe the courses that a user is taking)

* Settings
   * Guess style?
*boolean*
(desc: should we use ML to guess your learning style?)
   * Learning style
*enum value*
(desc: Visual, Auditory, Reading, Kinesthetic)
(note: Maybe this isn't the best thing to prompt for, as it likely isn't accurate?)

* Stats
   * Reading speed
*float*
(desc: how many words you can read in a minute) (unit: wpm)
   * Viewed Entities
*Array <Entity>*
(desc: the things that a User has viewed)
   * Liked Entities
*Array <Entity>*
(desc: the things that a User has marked as liked)
   * Disliked Entities
*Array <Entity>*
   * Pinned Entities
*Array <Entities>*
(desc: the things that they've saved for later)
   * Changed sections
*Array <Section>*
(desc: the Sections that they've changed the presentation style of)

## Guessed outputs
* Sections
*Sections*
(desc: Sections that they might benefit from)
(notes: because Sections are organized hierarchically, this might be more complex to deal with)
* Pages
*Pages*
(desc: Pages that might answer the things they're looking for)
* Tracks
*Tracks*
(desc: Tracks that they might be interested in in the future)
* StatementPlaceholders
*StatementPlaceholders*
(desc: things they probably know)