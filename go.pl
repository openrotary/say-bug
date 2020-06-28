#!/usr/bin/perl -w

use strict;
use feature qw(say);
use Data::Dumper;

my ($read_url) = @ARGV;

open READ, "<$read_url" or die "$!";

my $start_label = 'start-say-bug';
my $end_label = 'end-say-bug';
my $return_label = 'return';

my $isStart = 0;
my $isComment = 0;
my $index = 0;
my @cacheList = ();

sub trim {
	my $s = shift;
	$s =~ s/^\s+|\s+$//g;
	return $s;
}

while(<READ>) {
    $index++;
    # if($isStart and $_ =~ /$return_label/) {
    #     say "$_";
    # }
    print "$_";
    if($_ =~ /$start_label/) {
        $isStart = 1;
        next;
    }
    if($_ =~ /$end_label/) {
        $isStart = 0;
        next;
    }
    if(!$isStart) {
        next;
    }
    if($_ =~ /\/\*/) {
        # 剔除注释块
        $isComment = 1;
        next;
    }
    if($_ =~ /\*\//) {
        # 剔除注释块
        $isComment = 0;
        next;
    }
    if($_ =~ /\/\*[\S\s]+?\*\//) {
        # 剔除注释行
        next;
    }
    if($_ =~ /^\s+?\/{2}/) {
        # 剔除注释行 
        next;
    }
    if($_ =~ /\.(push|splice|trim)\(.+?;$/) {
        # 没有 等号 和 关键字
        my $text = "$`#";
        $text =~ /\S+?#/;
        $text =~ s/#//;
        print "console.log('原文件第 $index 行代码输出:', $text);";
        next;
    }
    if($_ =~ /.+?;$/ and @cacheList) {
        # 补充打印
        my ($index, $result) = @cacheList;
        print "console.log('原文件第 $index 行代码输出:', $result);";
        @cacheList = ();
        next;
    }
    if($_ =~ /(?<=&&).+?;/) {
        my $text = $&;
        if($text =~ /\s\=\s/) {
            $text =~ s/[\(\)]//g;
            $text =~ s/=.+?;$//;
            print "console.log('原文件第 $index 行代码输出:', $text);";
        }
        next;
    }
    if($_ =~ /(\s\=\s).+?;$/) {
        # 处理 = ;
        my $text = trim $`;
        $text =~ s/(let|const)\s//;
        my ($result) = split ':', $text;
        print "console.log('原文件第 $index 行代码输出:', $result);";
        next;
    }
    if($_ =~ /\s\=\s.+?[^;]$/) {
        my $text = trim $`;
        $text =~ s/(let|const)\s//;
        my ($result) = split ':', $text;
        @cacheList = ($index, $result);
        next;
    }
}

close READ;