import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGeneralStats } from '../redux/actions/statsActions';
import { StatCard } from './common/StatCard';

const Dashboard = ({ fetchGeneralStats, stats, loading, error }) => {
  useEffect(() => {
    fetchGeneralStats();
  }, [fetchGeneralStats]);

  if (loading) return <div className="ui active inline loader" />;
  if (error) return <div className="ui negative message">{error}</div>;

  return (
    <div className="ui container" style={{ paddingTop: '2rem' }}>
      <h2 className="ui header">Estadísticas Generales</h2>
      <div className="ui three stackable cards">
        <StatCard
          title="Usuarios"
          value={stats?.totalUsers ?? 0}
          iconClass="users"
        />
        <StatCard
          title="Cursos"
          value={stats?.totalCourses ?? 0}
          iconClass="book"
        />
        <StatCard
          title="Inscripciones"
          value={stats?.totalEnrollments ?? 0}
          iconClass="signup"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stats: state.stats.data,
  loading: state.stats.loading,
  error: state.stats.error,
});

const mapDispatchToProps = {
  fetchGeneralStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
