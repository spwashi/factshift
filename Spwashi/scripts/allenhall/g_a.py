import csv
import datetime
import html
import sys
from math import ceil

programs = {}

directory = '/var/www/dev/s/Spwashi/scripts/allenhall/'
output_dir = '/var/www/dev/s/Spwashi/views/allenhall/'


def ord(n):
    return str(n) + '<sup>' + ("th" if 4 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")) + '</sup>'


def week_of_month(dt):
    """ Returns the week of the month for the specified date.
    """

    first_day = dt.replace(day=1)

    dom = dt.day
    adjusted_dom = dom + first_day.weekday()

    return int(ceil(adjusted_dom / 7.0))


allenotes_order = ['timestamp', 'name', 'location', 'date_time', 'description', 'notes', 'help_needed',
                   'submitter_name', 'net_id']
recurrences_order = ['name', 'time', 'description', 'location', 'start_date', 'interval_and_parity', 'net_id',
                     'day_of_the_week']
programs_by_date = {'Sunday': [], 'Monday': [], 'Tuesday': [], 'Wednesday': [], 'Thursday': [], 'Friday': [],
                    'Saturday': [], 'Sunday2':[]}
days_in_order = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday2']

today = datetime.datetime.today()
today_otw = today.strftime('%w')

sunday = today.replace(minute=0, hour=0) + datetime.timedelta(days=7 - int(today_otw))
saturday = sunday.replace(minute=59, hour=23) + datetime.timedelta(days=6)
next_sunday=sunday+datetime.timedelta(weeks=1)

with open(directory + 'allenotes_weekly', 'r') as f:
    reader = csv.reader(f, delimiter='\t')
    start = True
    for program in reader:
        try:
            if (start):
                start = False
                continue
            name = program[0]
            programs[program[0]] = {}
            for index, value in enumerate(program):
                try:
                    programs[program[0]][recurrences_order[index]] = html.escape(value)
                except IndexError:
                    print("Failed ", program)
                    continue
            interval=programs[name]['interval_and_parity']
            if(len(interval)<1):
                print('skipping - (no interval)', name)
                del programs[name]
                continue
            if (interval.find('/') > -1):
                expl = interval.split('/')
                interval = programs[name]['interval'] = int(expl[0])
                parity = programs[name]['parity'] = expl[1]
            else:
                interval = programs[name]['interval'] = interval
                parity = programs[name]['parity'] = None
            interval = int(interval)
            if(interval>52 or not interval):
                print('skipping (irregular interval) - ', name)
                del programs[name]
                continue
            d_ = program[4].split('/')
            t_ = program[1].split(':')
            d_o = datetime.datetime(2016, int(d_[0]), int(d_[1]))

            go = True
            while (go == True):
                add_interval = interval
                tmp = d_o + datetime.timedelta(weeks=interval)
                if (parity != None):
                    wom = week_of_month(tmp)
                    if ((parity == 'even' and wom % 2 == 1) or (parity == 'odd' and wom % 2 == 0)):
                        tmp += datetime.timedelta(weeks=1)
                if tmp > saturday:
                    go = False
                else:
                    d_o = tmp
            if (d_o < sunday ):
                print('skipping (not happening this week)- ', name)
                del programs[name]
                continue
            programs[program[0]]['notes'] = ''
            programs[program[0]]['date_time'] = d_o.strftime('%m/%d') + ' ' + programs[program[0]]['time']
            programs[name]['dt']=d_o
        except ValueError:
            print('failed ', program)
            if (program[0] in programs):
                del programs[program[0]]
with open(directory + 'allenotes', 'r') as f:
    reader = csv.reader(f, delimiter='\t')
    start = True
    for program in reader:
        if (start):
            start = False
            continue
        name=program[1]
        exists = name in programs
        cache = False
        if(exists):
            print(name, ' Exists. Check to see that it is correct')
        if (exists and programs[name]['dt'] and not 'cache' in programs[name]):
            cache = programs[name]
            cache['tmp_name']=name+'_'
            programs[cache['tmp_name']]=cache
        programs[program[1]] = {}
        for index, value in enumerate(program):
            try:
                programs[program[1]][allenotes_order[index]] = html.escape(value)
            except IndexError:
                continue
        programs[name]['c']=cache


for i in programs:
    p = programs[i]
    try:
        complete = ''
        complete += '\t<div><b>' + p['name'] + '</b></div>\n'
        dt = p['date_time'].split(' ')
        time = dt[1]
        t_arr = time.split(':')
        date = dt[0]
        d_arr = date.split('/')
        date_obj = (datetime.datetime(2016, int(d_arr[0]), int(d_arr[1]), int(t_arr[0]), int(t_arr[1])))
        loc = p['location']
        #	complete+=date_obj.strftime('%A,%B %d,%I:%S')+','+loc+'\n'
        p['readable_time'] = str(int(date_obj.strftime('%I'))) + date_obj.strftime(':%S%p')
        p['dotw'] = date_obj.strftime('%A')
        p['dotm'] = int(date_obj.strftime('%d'))
        if ((date_obj.month != sunday.month) and (date_obj.month != next_sunday.month)) or (
                        date_obj.month == sunday.month and sunday.day > date_obj.day) or (
                        next_sunday.month == date_obj.month and next_sunday.day < date_obj.day):
            if(p['c']):
                cache=p['c']
                del p['c']
                p=programs[cache['tmp_name']]
                continue
            else:
                continue
        if(date_obj.day == next_sunday.day):
            p['dotw']='Sunday2'
        programs_by_date[p['dotw']].append(p)
        complete += '\t<i>' + date_obj.strftime('%A,%B ') + ord(int(p['dotm'])) + ', ' + p[
            'readable_time'].lower() + ', ' + loc + '</i>\n'
        complete += '\t<p>' + p['description'] + '</p>\n'
        p['complete'] = complete
        p['datetime'] = date_obj
    except KeyError as e:
        print('Error with ', e.args[0],' in ', p['name'])
box = []
full = []
for index, i in enumerate(days_in_order):
    program_list = sorted(programs_by_date[i], key=lambda k: k['datetime'])
    progs = []
    repped_date = sunday if index == 0 else sunday + datetime.timedelta(days=index)
    for j in program_list:
        p = j
        _time = str(int(p['datetime'].strftime('%I')))
        f_time = '' + _time + p['datetime'].strftime('%p') if int(p['datetime'].minute) == 0 else _time + p[
            'datetime'].strftime(':%M%p')
        f_time = f_time.lower()
        progs.append(f_time + ': ' + p['name'] + '  (' + p['location'] + ')')
        full.append('<div>' + p['complete'] + '</div>\n<br />')
    box.append('\n\t<tr>\n\t\t<td>' + repped_date.strftime('%a ') + ord(
        int(repped_date.strftime('%d'))) + '</td>\n\t\t<td>' + '<br>'.join(progs) + '</td>\n\t</tr>')

with open(output_dir + 'finished_allenotes.html', 'w') as after:
    html = ''
    html += '<html>\n<head><meta charset="UTF-8"></head>\n<body>\n'
    html += '<style>table{border-collapse:collapse;border:thin solid #000;}td{border:thin solid #000}p{padding:0;margin:0}</style>'
    html += '<table border="1">' + '\n'.join(box) + '\n</table>\n \n'
    html += '<div>' + '\n\n'.join(full) + '</div>\n'
    html += '</body>\n</html>'
    after.write(html)
sys.exit()