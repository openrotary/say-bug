#!/usr/bin/perl -w

use strict;
use feature qw(say);
use Data::Dumper;

my $str = "arr.push(2);";

if($str =~ /\.(push|splice|trim)\(.+?;$/) {
    my $text = "$`#";
    $text =~ /\S+?#/;
    say "$text";
}