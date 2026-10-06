<?php
require 'helperCron.php';

selfSendRequest('pastDayFollowUp');

selfSendRequest('sendMailForYearlyTotalExecutionReport', sha1(md5('sendMailForYearlyTotalExecutionReport')));
