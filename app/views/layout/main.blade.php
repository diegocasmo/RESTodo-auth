@include('layout.base.header')
 
        @if(Session::has('success'))
            <span class="session success"> {{ Session::get('success') }} </span>        
        @endif
 
        @if(Session::has('error'))
            <span class="session error">{{ Session::get('error') }}</span>
        @endif
 
        @yield('content')
 
@include('layout.base.footer')