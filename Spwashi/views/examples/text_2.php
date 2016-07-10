<?php
/**
 * User: sam
 * Date: 6/8/15
 * Time: 2:08 PM
 */
?>
<!--suppress ALL -->
<h2>A Simple Makefile Tutorial</h2>

<p>
	Makefiles are a simple way to organize code compilation. This tutorial
	does not even scratch the surface of what is possible using
	<em>make</em>, but is intended as a starters guide so that you can
	quickly and easily create your own makefiles for small to medium-sized
	projects.</p>

<h3>A Simple Example</h3>

<p>
	Let's start off with the following three files, hellomake.c,
	hellofunc.c, and hellomake.h, which would represent a typical main
	program, some functional code in a separate file, and an include file,
	respectively.</p>

<table border="1">
	<tbody>
	<tr>
		<th>hellomake.c</th>
		<th>hellofunc.c</th>
		<th>hellomake.h</th>
	</tr>
	<tr>
		<td>
<pre>#include &lt;hellomake.h&gt;

int main() {
  // call a function in another file
  myPrintHelloMake();

  return(0);
}
</pre>
		</td>
		<td>
<pre>#include &lt;stdio.h&gt;
#include &lt;hellomake.h&gt;

void myPrintHelloMake(void) {

  printf("Hello makefiles!\n");

  return;
}
</pre>
		</td>
		<td>
<pre>/*
example include file
*/

void myPrintHelloMake(void);
</pre>
		</td>
	</tr>
	</tbody>
</table>

<p>
	Normally, you would compile this collection of code by executing the following command:</p>

<p>
	<tt>gcc -o hellomake hellomake.c hellofunc.c -I.</tt></p>

<p>
	This compiles the two .c files and names the executable hellomake. The
	<tt>-I.</tt> is included so that gcc will look in the current
	directory (.) for the include file hellomake.h. Without a makefile,
	the typical approach to the test/modify/debug cycle is to use the up
	arrow in a terminal to go back to your last compile command so you
	don't have to type it each time, especially once you've added a few
	more .c files to the mix.</p>

<p>
	Unfortunately, this approach to compilation has two downfalls. First,
	if you lose the compile command or switch computers you have to retype
	it from scratch, which is inefficient at best. Second, if you are only
	making changes to one .c file, recompiling all of them every time is
	also time-consuming and inefficient. So, it's time to see what we can
	do with a makefile.</p>

<p>
	The simplest makefile you could create would look something like:</p>

<a href="makefile.1">Makefile 1</a>
<pre>hellomake: hellomake.c hellofunc.c
     gcc -o hellomake hellomake.c hellofunc.c -I.
</pre>

<p>
	If you put this rule into a file called <tt>Makefile</tt> or
	<tt>makefile</tt> and then type <tt>make</tt> on the command line it
	will execute the compile command as you have written it in the
	makefile. Note that <tt>make</tt> with no arguments executes the first
	rule in the file. Furthermore, by putting the list of files on which
	the command depends on the first line after the <tt>:</tt>, make knows
	that the rule <tt>hellomake</tt> needs to be executed if any of those
	files change. Immediately, you have solved problem #1 and can avoid
	using the up arrow repeatedly, looking for your last compile
	command. However, the system is still not being efficient in terms of
	compiling only the latest changes.</p>

<p>
	One very important thing to note is that there is a tab before the gcc
	command in the makefile. There must be a tab at the beginning of any
	command, and <tt>make</tt> will not be happy if it's not there.</p>

<p>
	In order to be a bit more efficient, let's try the following:</p>

<a href="makefile.2">Makefile 2</a>
<pre>CC=gcc
CFLAGS=-I.

hellomake: hellomake.o hellofunc.o
     $(CC) -o hellomake hellomake.o hellofunc.o -I.

</pre>

<p>
	So now we've defined some constants <tt>CC</tt> and
	<tt>CFLAGS</tt>. It turns out these are special constants that
	communicate to <tt>make</tt> how we want to compile the files
	hellomake.c and hellofunc.c. In particular, the macro <tt>CC</tt> is
	the C compiler to use, and <tt>CFLAGS</tt> is the list of flags to
	pass to the compilation command. By putting the object
	files--hellomake.o and hellofunc.o--in the dependency list and in the
	rule, <tt>make</tt> knows it must first compile the .c versions
	individually, and then build the executable hellomake.</p>

<p>
	Using this form of makefile is sufficient for most small scale
	projects. However, there is one thing missing: dependency on the
	include files. If you were to make a change to hellomake.h, for
	example, <tt>make</tt> would not recompile the .c files, even though
	they needed to be. In order to fix this, we need to tell <tt>make</tt>
	that all .c files depend on certain .h files. We can do this by
	writing a simple rule and adding it to the makefile.</p>

<a href="makefile.3">Makefile 3</a>
<pre>CC=gcc
CFLAGS=-I.
DEPS = hellomake.h

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $&lt; $(CFLAGS)

hellomake: hellomake.o hellofunc.o
	gcc -o hellomake hellomake.o hellofunc.o -I.
</pre>

<p>
	This addition first creates the macro DEPS, which is the set of .h
	files on which the .c files depend. Then we define a rule that applies
	to all files ending in the .o suffix. The rule says that the .o file
	depends upon the .c version of the file and the .h files included in
	the DEPS macro. The rule then says that to generate the .o file,
	<tt>make</tt> needs to compile the .c file using the compiler defined
	in the CC macro. The -c flag says to generate the object file, the
	<tt>-o $@</tt> says to put the output of the compilation in the file
	named on the left side of the <tt>:</tt>, the <tt>$&lt;</tt> is the first item in
	the dependencies list, and the CFLAGS macro is defined as above.</p>

<p>
	As a final simplification, let's use the special macros <tt>$@</tt>
	and <tt>$^</tt>, which are the left and right sides of the <tt>:</tt>,
	respectively, to make the overall compilation rule more general. In
	the example below, all of the include files should be listed as part
	of the macro DEPS, and all of the object files should be listed as
	part of the macro OBJ.</p>

<a href="makefile.4">Makefile 4</a>
<pre>CC=gcc
CFLAGS=-I.
DEPS = hellomake.h
OBJ = hellomake.o hellofunc.o

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $&lt; $(CFLAGS)

hellomake: $(OBJ)
	gcc -o $@ $^ $(CFLAGS)
</pre>

<p>
	So what if we want to start putting our .h files in an include
	directory, our source code in a src directory, and some local
	libraries in a lib directory? Also, can we somehow hide those
	annoying .o files that hang around all over the place? The answer, of
	course, is yes. The following makefile defines paths to the include
	and lib directories, and places the object files in an obj
	subdirectory within the src directory. It also has a macro defined
	for any libraries you want to include, such as the math library
	<tt>-lm</tt>. This makefile should be located in the src
	directory. Note that it also includes a rule for cleaning up your
	source and object directories if you type <tt>make clean</tt>. The
	.PHONY rule keeps <tt>make</tt> from doing something with a file named
	clean.</p>

<a href="makefile.5">Makefile 5</a>
<pre>IDIR =../include
CC=gcc
CFLAGS=-I$(IDIR)

ODIR=obj
LDIR =../lib

LIBS=-lm

_DEPS = hellomake.h
DEPS = $(patsubst %,$(IDIR)/%,$(_DEPS))

_OBJ = hellomake.o hellofunc.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))


$(ODIR)/%.o: %.c $(DEPS)
	$(CC) -c -o $@ $&lt; $(CFLAGS)

hellomake: $(OBJ)
	gcc -o $@ $^ $(CFLAGS) $(LIBS)

.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~
</pre>

<p>
	So now you have a perfectly good makefile that you can modify to
	manage small and medium-sized software projects. You can add multiple
	rules to a makefile; you can even create rules that call other
	rules. For more information on makefiles and the <tt>make</tt>
	function, check out the

	<a href="http://www.gnu.org/software/make/manual/make.html">GNU Make Manual</a>,

	which will tell you more than you ever wanted to know (really).
</p>