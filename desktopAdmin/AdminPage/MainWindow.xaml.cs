using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace AdminPage
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            //Loaded += MainWindow_Loaded;
            //SizeChanged += MainWindow_SizeChanged;
        }

        //private void MainWindow_Loaded(object sender, RoutedEventArgs e)
        //{
        //    // Set initial width once layout is ready
        //    tabControl.Width = ActualWidth - 50;
        //    tabControl.Height = ActualHeight - 50;
        //}

        //private void MainWindow_SizeChanged(object sender, SizeChangedEventArgs e)
        //{
        //    // Keep tabControl width in sync with the window width
        //    tabControl.Width = e.NewSize.Width - 50;
        //    tabControl.Height = e.NewSize.Height - 50;
        //}
    }
}